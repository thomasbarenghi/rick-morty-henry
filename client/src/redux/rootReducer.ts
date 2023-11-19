import { combineReducers } from '@reduxjs/toolkit'
import client from './slices/client'
import authSession from './slices/authSession'

const rootReducer = combineReducers({
  client,
  authSession
})

export default rootReducer
