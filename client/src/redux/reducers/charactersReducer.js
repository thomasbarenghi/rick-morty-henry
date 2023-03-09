import { SELECT_CHARACTER, FAVORITE_CHARACTER, FILTER_CHARACTERS, GET_CHARACTERS, CHANGE_FILTER } from "../actions/actionTypes";

const initialState = {
    personajes: {
        activos: [],
        seleccionados: [],
        favoritos: [],
        todos: [],
        propios : [],
        filtro: { index: 0, genero: "default", especie: "default", search: "" },
        personajeDetail: null
    }
};




const rootReducer = (state = initialState, action) => {



    switch (action.type) {

        case "CHANGE_FILTER":
            console.log(action.payload);
            const indexActual = state.personajes.filtro.index;
            //const currentCharacters = state.personajes.activos;
            const properties1 = { 0: "todos", 1: "seleccionados", 2: "favoritos" };
            const currentCharacters = state.personajes[properties1[state.personajes.filtro.index]];

            if(currentCharacters === undefined){
                return
            }
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

            })

            filteredCharacters.sort((a, b) => {
                if (action.payload.orden === "A-Z") {
                    return a.name.localeCompare(b.name);
                } else if (action.payload.orden === "Z-A") {
                    return b.name.localeCompare(a.name);
                } else {
                    return filteredCharacters;
                }
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
            const properties = { 0: "todos", 1: "seleccionados", 2: "favoritos", 3: "propios" };
            //actions.getFavorites()
            
            if (action.payload === null) {
                return {
                    ...state,
                    personajes: {
                        ...state.personajes,
                        activos: state.personajes[properties[state.personajes.filtro.index]]
                    }
                }
            }
                
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

            case "GET_PROPIOS":
                console.log("hola get PROPIOS")
                console.log(action.payload)
                return {
                    ...state,
                    personajes: {
                        ...state.personajes,
                        propios: action.payload
                    }
                };

                case "DELETE_PROPIO":
                    console.log("hola delete PROPIO")
                    
                    const propioIsSelected = state.personajes.seleccionados.find(
                        (character) => character.id === action.payload
                    );

             console.log(state.personajes.seleccionados, action.payload)


                    if (propioIsSelected) {
                        return {
                            ...state,
                            personajes: {
                                ...state.personajes,
                                seleccionados: state.personajes.seleccionados.filter((character) => character.id !== action.payload)
                            }
                        };
                    }
                    else{
                        console.log("no estaba seleccionado")
                    }

                        const propioIsFavorite = state.personajes.favoritos.find(
                            (character) => character.id === action.payload
                        );
                        if (propioIsFavorite) {
                            return {
                                ...state,
                                personajes: {
                                    ...state.personajes,
                                    favoritos: state.personajes.favoritos.filter((character) => character.id !== action.payload)
                                }
                            };
                        }
                        else{
                            console.log("no estaba favorito")
                        }






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