import { SELECT_CHARACTER, GET_CHARACTERS, GET_CHARACTER, CHANGE_INDEX, FAVORITE_CHARACTER, CHANGE_FILTER } from "./actionTypes";


export function selectCharacter(id) {
  //console.log("select", id);
  return { type: SELECT_CHARACTER, payload: id };
}

export function favoriteCharacter(id) {
  console.log("favorite", id);
  return { type: FAVORITE_CHARACTER, payload: id };
}


export function changeIndex(index) {
 // console.log("index", index);
  return { type: CHANGE_INDEX, payload: index };
}

export function changeFilter(filtro) {
  //console.log("filter", filtro);
  return { type: CHANGE_FILTER, payload: filtro };
}

export const getCharacters = () => {
  return function (dispatch){
      return fetch ("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(res => dispatch({type: GET_CHARACTERS, payload: res.results} ))
  }
};

export const getCharacter = (id) => {
  console.log("soy id en character",id)
  return function (dispatch){
      return fetch (`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(res => dispatch({type: GET_CHARACTER, payload: res} ))
  }
};
