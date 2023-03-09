import { SELECT_CHARACTER, GET_CHARACTERS, GET_CHARACTER, CHANGE_INDEX, FAVORITE_CHARACTER, CHANGE_FILTER } from "./actionTypes";
import { SERVER_URL } from "../../api/config";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('token');
const userId = Cookies.get('userId');



//Setea los activos y agrega o quita de seleccionados
export function selectCharacter(id) {
  return { type: SELECT_CHARACTER, payload: id };
}


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

  return async function (dispatch) {

    const token = Cookies.get('token');
    const userId = Cookies.get('userId');

    try {
      const response = await fetch(`${SERVER_URL}/client/favorites`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          'userId': userId
        }
      })

      const json = await response.json();

      dispatch({ type: "GET_FAVORITES", payload: json.result })

    } catch (error) { console.log(error); }

  }
};



//Propios
export const getPropios = () => {

  return async function (dispatch) {

    const token = Cookies.get('token');
    const userId = Cookies.get('userId');

    if (!token || !userId) { return Promise.reject(new Error('No hay token o userId en getPropios')); }

    try {

      const response = await fetch(`${SERVER_URL}/characters?author=${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          'userId': userId
        }
      })

      const json = await response.json();

      console.log("propiosres", json.result)
      dispatch({ type: "GET_PROPIOS", payload: json.result })
      dispatch({ type: "CHANGE_INDEX", payload: null })

    } catch (error) { console.log(error) }

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
      .then(res => (console.log("borrando", res), dispatch(getPropios()), dispatch({ type: "DELETE_PROPIO", payload: id })))
  }
};


//Index
export const changeIndex = (index) => {
  return (dispatch) => { dispatch({ type: "CHANGE_INDEX", payload: index }); };
};


//Personajes
export const getCharacters = () => {

  return async function (dispatch) {

    const token = Cookies.get('token');
    const userId = Cookies.get('userId');

    if (!token || !userId) { return Promise.reject(new Error('No hay token o userId en getCharacters')); }


    try {

      const response = await fetch(`${SERVER_URL}/characters`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          'userId': userId
        }
      });

      const json = await response.json();

      dispatch({ type: GET_CHARACTERS, payload: json.result });


    } catch (error) { console.log(error); }

  };
};


export const getCharacter = (id) => {

  return async function (dispatch) {

    const token = Cookies.get('token');
    const userId = Cookies.get('userId');

    if (!token || !userId) { return Promise.reject(new Error('No hay token o userId')); }

    try {
      const response = await fetch(`${SERVER_URL}/characters/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            'userId': userId
          }
        })

      const json = await response.json();
      dispatch({ type: GET_CHARACTER, payload: json.result })

    } catch (error) { console.log(error); }

  };
};


//Filters
export function changeFilter(filtro) { return { type: CHANGE_FILTER, payload: filtro }; }