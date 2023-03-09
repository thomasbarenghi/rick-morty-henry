import { SELECT_CHARACTER, GET_CHARACTERS, GET_CHARACTER, CHANGE_INDEX, FAVORITE_CHARACTER, CHANGE_FILTER } from "./actionTypes";
import { SERVER_URL } from "../../api/config";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('token');
const userId = Cookies.get('userId');

//Seleccionados
export function selectCharacter(id) {
  //console.log("select", id);
  return { type: SELECT_CHARACTER, payload: id };
}


//Favoritos
export const favoriteCharacter = (character) => {

  return (dispatch, getState) => {
    const state = getState();

    const isAlreadyFavorite = state.personajes.favoritos.find(
      (c) => c.id === character.id
    );
    if (isAlreadyFavorite) {
      axios.delete(`${SERVER_URL}/client/favorites/${character.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          'userId': userId
        }
      })
        .then((res) => {
          console.log(res);
          dispatch(getFavorites()); // actualiza los personajes favoritos en el estado de Redux
        })
        .catch((err) => console.log(err));
    } else {
      axios.post(`${SERVER_URL}/client/favorites`, {
        defaultCharacterId: character.id,
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "userId": userId
        }
      })
        .then((res) => {
          console.log(res);
          dispatch(getFavorites()); // actualiza los personajes favoritos en el estado de Redux
        })
        .catch((err) => console.log(err));
    }
  };
};

export const getFavorites = () => {

  return function (dispatch) {
    return fetch(`${SERVER_URL}/client/favorites`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'userId': userId
      }
    })
      .then(res => res.json())
      .then(res => (console.log(res.result), dispatch({ type: "GET_FAVORITES", payload: res.result })))
  };
};


//Propios
export const getPropios = () => {
  return function (dispatch) {
    return fetch(`${SERVER_URL}/characters?author=${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'userId': userId
      }
    })
      .then(res => res.json())
      .then(res => dispatch({ type: "GET_PROPIOS", payload: res.result }))
  }
};

export const createPropio = (character) => {
  return function (dispatch) {
    return fetch(`${SERVER_URL}/characters`, {
      method: "POST",
      body: JSON.stringify(character),
      headers: {
        'userid': userId,
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(res => getPropios())
  }
};

export const deletePropio = (id) => {
  return function (dispatch) {
    return fetch(`${SERVER_URL}/characters/${id}`, {
      method: "DELETE",
      headers: {
        'userid': userId,
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => getPropios())
  }
};


//Index
export const changeIndex = (index) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_INDEX", payload: index });
    dispatch(getFavorites());
  };
};


//Filters
export function changeFilter(filtro) {
  console.log("filter", filtro);
  return { type: CHANGE_FILTER, payload: filtro };
}


//Personajes
export const getCharacters = () => {
  return function (dispatch) {
    return fetch(`${SERVER_URL}/characters`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'userId': userId
      }
    })
      .then(res => res.json())
      .then(res => dispatch({ type: GET_CHARACTERS, payload: res.result }))
  }
};

export const getCharacter = (id) => {
  console.log("soy id en character", id)
  return function (dispatch) {
    return fetch(`${SERVER_URL}/characters/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          'userId': userId
        }
      })
      .then(res => res.json())
      .then(res => dispatch({ type: GET_CHARACTER, payload: res.result }))
  }
};
