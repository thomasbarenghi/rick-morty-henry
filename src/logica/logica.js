export default function Logica(){}

export const handleSelectExtern = (id, personajes, setPersonajes) => {
    const character = personajes.characters.find((character) => character.id === id);
    const isAlreadySelected = personajes.seleccionados.find((character) => character.id === id);
  
    const nuevosSeleccionados = isAlreadySelected
      ? personajes.seleccionados.filter((character) => character.id !== id)
      : [...personajes.seleccionados, character];
  
    setPersonajes({ ...personajes, seleccionados: nuevosSeleccionados });
  
    return !isAlreadySelected;
  };

  export const handleFavoritosExtern = (id, personajes, setPersonajes) => {
    const character = personajes.characters.find(
      (character) => character.id === id
    );
    const isAlreadySelected = personajes.favoritos.find(
      (character) => character.id === id
    );

    setPersonajes({
      ...personajes,
      favoritos: isAlreadySelected
        ? personajes.favoritos.filter((character) => character.id !== id)
        : [...personajes.favoritos, character],
    });

    return !isAlreadySelected;
  };
  
  // filtro.js
// logica.js

export function filtrarPersonajesExtern(personajes, filtro, setPersonajes) {
  console.log("hoña",filtro)
    const properties = { 0: "todos", 1: "seleccionados", 2: "favoritos" };
    const index = filtro.index;
    const currentCharacters = personajes[properties[index]];
  
    
    const filteredCharacters = currentCharacters.filter((character) => {
      const filterByGender =
        filtro.genero !== "default"
          ? character.gender === filtro.genero
          : true;
      const filterBySpecies =
        filtro.especie !== "default"
          ? character.species === filtro.especie
          : true;
      const filterByName = character.name
        .toLowerCase()
        .includes(filtro.search.toLowerCase());
      return filterByGender && filterBySpecies && filterByName;
    });
  
    setPersonajes({ ...personajes, characters: filteredCharacters });

  }
  
  