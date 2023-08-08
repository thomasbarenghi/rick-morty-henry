"use client";
import { createSelector } from "reselect";
import { RootState } from "../store/store";
import { DEFAULT } from "@/constants";

const characters = (state: RootState) => state?.client?.characters.characters;
const ownedCharacters = (state: RootState) =>
  state?.client?.characters?.ownedCharacters;
const favorites = (state: RootState) => state?.client?.favorites?.characters;
const index = (state: RootState) => state?.client?.characters?.index;
const filters = (state: RootState) => state?.client?.filters;

export const selectorIndexCharacters = createSelector(
  index,
  characters,
  favorites,
  ownedCharacters,
  filters,
  (index, characters, favorites, ownedCharacters, filters) => {
    const allCharacters = [characters, favorites, ownedCharacters];
    const currentCharacters = allCharacters[index];

    const filteredCharacters = currentCharacters?.filter((character) => {
      const filterByGender =
        filters.gender && filters.gender !== DEFAULT
          ? character.gender === filters.gender
          : true;

      const filterBySpecies =
        filters.species && filters.species !== DEFAULT
          ? character.species === filters.species
          : true;

      const filterByName =
        filters.search && filters.search !== ""
          ? character.name.toLowerCase().includes(filters.search.toLowerCase())
          : true;

      return filterByGender && filterBySpecies && filterByName;
    });

    filteredCharacters?.sort((a, b) => {
      if (filters.order === "A-Z") {
        return a.name.localeCompare(b.name);
      } else if (filters.order === "Z-A") {
        return b.name.localeCompare(a.name);
      } else {
        return filteredCharacters;
      }
    });

    return filteredCharacters;
  }
);
