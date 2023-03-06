import { SELECT_CHARACTER, FAVORITE_CHARACTER, FILTER_CHARACTERS, GET_CHARACTERS, CHANGE_FILTER } from "../actions/actionTypes";
import fetchCharacters from "../../api/getCharacters";
import {getFavorites} from "../actions/actions";
import useDispatch from "react-redux";

const initialState = {
    personajes: {
        activos: [],
        seleccionados: [],
        favoritos: [],
        todos: [],
        filtro: { index: 0, genero: "default", especie: "default", search: "" },
        personajeDetail: null
    }
};




const rootReducer = (state = initialState, action) => {



    switch (action.type) {

        case "CHANGE_FILTER":
            console.log(action.payload.genero);
            const indexActual = state.personajes.filtro.index;
            //const currentCharacters = state.personajes.activos;
            const properties1 = { 0: "todos", 1: "seleccionados", 2: "favoritos" };
            const currentCharacters = state.personajes[properties1[state.personajes.filtro.index]];

            const filteredCharacters = currentCharacters.filter((character) => {

                const filterByGender =
                    action.payload.genero && action.payload.genero !== "default"
                        ? character.gender === action.payload.genero
                        : true;


                const filterBySpecies =
                    action.payload.especie && action.payload.especie !== "default"
                        ? character.species === action.payload.especie
                        : true;

                const filterByName = character.name
                    .toLowerCase()
                    .includes(action.payload.search.toLowerCase());

                return filterByGender && filterBySpecies && filterByName;

            });

            return {
                ...state,
                personajes: {
                    ...state.personajes,
                    filtro: {
                        ...state.personajes.filtro,
                        genero: action.payload.genero,
                        especie: action.payload.especie,
                        search: action.payload.search
                    },
                    activos: filteredCharacters
                }
            }


        case "CHANGE_INDEX":
            const properties = { 0: "todos", 1: "seleccionados", 2: "favoritos" };
            //actions.getFavorites()

      

            return {
                ...state,
                personajes: {
                    ...state.personajes,
                    filtro: {
                        ...state.personajes.filtro,
                        index: action.payload
                    },
                    activos: state.personajes[properties[action.payload]]
                }
            }

        case "GET_CHARACTERS":
            console.log("hola get characters")
            return {
                ...state,
                personajes: {
                    ...state.personajes,
                    activos: action.payload,
                    todos: action.payload,
                },
            };

        case "SELECT_CHARACTER":
            console.log(state.personajes.seleccionados);
            const isAlreadySelected = state.personajes.seleccionados.find(
                (character) => character.id === action.payload.id
            );
            if (isAlreadySelected) {
                return {
                    ...state,
                    personajes: {
                        ...state.personajes,
                        seleccionados: state.personajes.seleccionados.filter((character) => character.id !== action.payload.id)
                    }
                };
            } else {
                return {
                    ...state,
                    personajes: {
                        ...state.personajes,
                        seleccionados: [...state.personajes.seleccionados, action.payload]
                    }
                };
            };

        case "GET_FAVORITES":
            console.log("hola get favorites")
            return {
                ...state,
                personajes: {
                    ...state.personajes,
                    favoritos: action.payload
                }
            };


        case "FAVORITE_CHARACTER":
            const isAlreadyFavorite = state.personajes.favoritos.find(
                (character) => character.id === action.payload.id
            );
            if (isAlreadyFavorite) {
                return {
                    ...state,
                    personajes: {
                        ...state.personajes,
                        favoritos: state.personajes.favoritos.filter((character) => character.id !== action.payload.id)
                    }
                };
            } else {
                return {
                    ...state,
                    personajes: {
                        ...state.personajes,
                        favoritos: [...state.personajes.favoritos, action.payload]
                    }
                };
            };




        case "GET_CHARACTER":
            console.log(action.payload, "payload")
            return {
                ...state,
                personajes: {
                    ...state.personajes,
                    personajeDetail: action.payload
                }
            };


        default:
            return;
    }
}

export default rootReducer;