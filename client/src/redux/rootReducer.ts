import { combineReducers } from "@reduxjs/toolkit";
import system from "./slices/system";
import client from "./slices/client";
import authSession from "./slices/authSession";

const rootReducer = combineReducers({
  system: system,
  client: client,
  authSession: authSession,
});

export default rootReducer;
