import { combineReducers } from "@reduxjs/toolkit";
import favorites from "./favorites";
import characters from "./characters";
import genres from "./genres";
import platforms from "./platforms";

const rootReducer = combineReducers({
  favorites,
  characters,
});

export default rootReducer;
