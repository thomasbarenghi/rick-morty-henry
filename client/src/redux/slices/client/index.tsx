import { combineReducers } from '@reduxjs/toolkit'
import favorites from './favorites'
import characters from './characters'
import filters from './filters'

const rootReducer = combineReducers({
  favorites,
  characters,
  filters
})

export default rootReducer
