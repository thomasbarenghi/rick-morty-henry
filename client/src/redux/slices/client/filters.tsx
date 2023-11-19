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
      console.log('setFilterGender.payload', action.payload)
      state.gender = action.payload
    },
    setFilterSpecies: (state, action: PayloadAction<string>) => {
      console.log('setFilterSpecies.payload', action.payload)
      state.species = action.payload
    },
    setFilterOrder: (state, action: PayloadAction<string>) => {
      console.log('setFilterOrder.payload', action.payload)
      state.order = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      console.log('setSearch.payload', action.payload)
      state.search = action.payload
    },
    resetFilters: (state) => {
      console.log('resetFilters.payload', initialState)
      state.search = ''
      state.gender = ''
      state.species = ''
      state.order = ''
    }
  },
  extraReducers: (builder) => {}
})

export const { setFilterGender, setFilterOrder, setFilterSpecies, setSearch, resetFilters } = filtersSlice.actions

export default filtersSlice.reducer
