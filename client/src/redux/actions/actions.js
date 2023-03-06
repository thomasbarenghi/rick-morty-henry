import { SELECT_CHARACTER, GET_CHARACTERS, GET_CHARACTER, CHANGE_INDEX, FAVORITE_CHARACTER, CHANGE_FILTER } from "./actionTypes";
import { SERVER_URL } from "../../api/config";
import axios from "axios";

export function selectCharacter(id) {
  //console.log("select", id);
  return { type: SELECT_CHARACTER, payload: id };
}

export function favoriteCharacter2(id) {
  console.log("favorite", id);
  return { type: FAVORITE_CHARACTER, payload: id };
}

export const favoriteCharacter = (character) => {
  return (dispatch, getState) => {
    const state = getState();
    const isAlreadyFavorite = state.personajes.favoritos.find(
      (c) => c.id === character.id
    );
    if (isAlreadyFavorite) {
      axios.delete(`${SERVER_URL}/client/favorites/${character.id}`)
        .then((res) => {
          console.log(res);
          dispatch(getFavorites()); // actualiza los personajes favoritos en el estado de Redux
        })
        .catch((err) => console.log(err));
    } else {
      axios.post(`${SERVER_URL}/client/favorites`, character)
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
    return fetch(`${SERVER_URL}/client/favorites`)
      .then(res => res.json())
      .then(res => dispatch({ type: "GET_FAVORITES", payload: res }))
  };
};



export const changeIndex = (index) => {
  return (dispatch) => {
    // Realizar alguna operación asíncrona aquí, como una llamada a la API
    // ...

    // Enviar una acción al store
    dispatch({ type: "CHANGE_INDEX", payload: index });

    // Enviar otra acción al store si es necesario
    dispatch(getFavorites());
  };
};


export function changeFilter(filtro) {
  console.log("filter", filtro);
  return { type: CHANGE_FILTER, payload: filtro };
}

export const getCharacters = () => {
  return function (dispatch) {
    return fetch(`${SERVER_URL}/characters`)
      .then(res => res.json())
      .then(res => dispatch({ type: GET_CHARACTERS, payload: res }))
  }
};

export const getCharacter = (id) => {
  console.log("soy id en character", id)
  return function (dispatch) {
    return fetch(`${SERVER_URL}/characters/${id}`)
      .then(res => res.json())
      .then(res => dispatch({ type: GET_CHARACTER, payload: res }))
  }
};
