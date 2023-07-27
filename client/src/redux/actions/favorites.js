import { GET_FAVORITES } from "./actionTypes";
import { SERVER_URL } from "../../api/config";
import axios from "axios";
import Cookies from "js-cookie";

export const favoriteCharacter = (character) => (dispatch, getState) => {
  const { token, userId } = Cookies.get();
  if (!token || !userId) {
    return Promise.reject(new Error("No hay token o userId en getFavorites"));
  }

  const config = {
    headers: { Authorization: `Bearer ${token}`, userId: userId },
  };
  const state = getState();
  const isAlreadyFavorite = state.personajes.favoritos.find(
    (c) => c.id === character.id,
  );

  if (isAlreadyFavorite) {
    axios
      .delete(`${SERVER_URL}/client/favorites/${character.id}`, config)
      .then((res) => {
        dispatch(getFavorites());
      })
      .catch((err) => console.error(err));
  } else {
    axios
      .post(
        `${SERVER_URL}/client/favorites`,
        { defaultCharacterId: character.id },
        config,
      )
      .then((res) => {
        dispatch(getFavorites());
      })
      .catch((err) => console.error(err));
  }
};

export const getFavorites = () => async (dispatch) => {
  const { token, userId } = Cookies.get();
  if (!token || !userId) {
    return Promise.reject(new Error("No hay token o userId en getFavorites"));
  }

  try {
    const response = await fetch(`${SERVER_URL}/client/favorites`, {
      headers: { Authorization: `Bearer ${token}`, userId: userId },
    });

    const json = await response.json();
    dispatch({ type: GET_FAVORITES, payload: json.result });
  } catch (err) {
    console.error(err);
  }
};
