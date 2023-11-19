import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  gender: '',
  species: '',
  order: '',
  search: ''
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload
    },
    setFilterSpecies: (state, action: PayloadAction<string>) => {
      state.species = action.payload
    },
    setFilterOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    resetFilters: (state) => {
      state.search = ''
      state.gender = ''
      state.species = ''
      state.order = ''
    }
  }
})

export const { setFilterGender, setFilterOrder, setFilterSpecies, setSearch, resetFilters } = filtersSlice.actions

export default filtersSlice.reducer
