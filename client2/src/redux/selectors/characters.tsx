"use client";
import { createSelector } from "reselect";
import { RootState } from "../store/store";

const characters = (state: RootState) => state?.client?.characters.characters;
const ownedCharacters = (state: RootState) =>
  state?.client?.characters?.ownedCharacters;
const favorites = (state: RootState) => state?.client?.favorites?.characters;
const index = (state: RootState) => state?.client?.characters?.index;

export const selectorIndexCharacters = createSelector(
  index,
  characters,
  favorites,
  ownedCharacters,
  (index, characters, favorites, ownedCharacters) => {
    const allCharacters = [characters, favorites, ownedCharacters];
    return allCharacters[0];
  }
);
