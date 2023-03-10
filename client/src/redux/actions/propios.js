import { DELETE_PROPIO, GET_PROPIOS, CHANGE_INDEX } from "./actionTypes";
import { SERVER_URL } from "../../api/config";
import axios from "axios";
import Cookies from "js-cookie";

export const getPropios = () => async (dispatch) => {

    const { token, userId } = Cookies.get();
    if (!token || !userId) { return Promise.reject(new Error('No hay token o userId en getPropios')); }

    try {

        const response = await fetch(`${SERVER_URL}/characters?author=${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`, 'userId': userId
            }
        })

        const json = await response.json();

        dispatch({ type: GET_PROPIOS, payload: json.result });
        dispatch({ type: CHANGE_INDEX, payload: null });

    } catch (error) { console.error(error) }

};


export const createPropio = (character) => async (dispatch) => {

    const { token, userId } = Cookies.get();
    if (!token || !userId) { return Promise.reject(new Error('No hay token o userId en getPropios')); }

    const config = { headers: { "Authorization": `Bearer ${token}` } };

    try {

        const response = await axios.post(`${SERVER_URL}/characters`, character, config);
        dispatch(getPropios());

    } catch (error) { console.error(error) }

};


export const deletePropio = (id) => async (dispatch) => {

    const { token, userId } = Cookies.get();
    if (!token || !userId) { return Promise.reject(new Error('No hay token o userId en getPropios')); }

    const config = { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } }

    try {

        const response = await fetch(`${SERVER_URL}/characters/${id}`, config);

        dispatch(getPropios());
        dispatch({ type: DELETE_PROPIO, payload: id });

    } catch (error) { console.error(error) }

};