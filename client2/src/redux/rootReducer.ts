import { combineReducers } from "@reduxjs/toolkit";
import system from "./slices/system";
import client from "./slices/client";

const rootReducer = combineReducers({
  system: system,
  client: client,
});

export default rootReducer;
