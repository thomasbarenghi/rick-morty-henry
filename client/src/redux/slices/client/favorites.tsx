import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { postRequest, deleteRequest } from '@/services/apiRequest.service'
import { toast } from 'sonner'
import { type RootState } from '@/redux/store/store'

const initialState = {
  characters: [] as any[],
  isError: false,
  isLoading: false
}

export const manageFavoriteCharacter = createAsyncThunk(
  'favorites/manageFavoriteCharacter',
  async (character: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState
      const userId = state.authSession.session.current.id
      const isAlreadyFavorite = Boolean(state?.client?.favorites?.characters?.find((c: any) => c.id === character?.id))

      console.log('isAlreadyFavorite', isAlreadyFavorite, character)
      let response
      if (isAlreadyFavorite) {
        const { data } = await deleteRequest(`/users/${userId}/favorites`, { characterId: character?.id })
        response = data
      } else {
        const { data } = await postRequest(`/users/${userId}/favorites`, { characterId: character?.id })
        response = data
      }
      return {
        data: response,
        operation: isAlreadyFavorite ? 'delete' : 'add'
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<any>) => {
      state.characters = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(manageFavoriteCharacter.fulfilled, (state, action) => {
        const { data, operation } = action.payload
        console.log('data', data, 'operation', operation)
        if (operation === 'add') {
          state.characters.push(data)
        } else {
          state.characters = state.characters.filter((c: any) => c?.id !== data?.id)
        }
      })
      .addCase(manageFavoriteCharacter.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        toast.error('Error al gestionar favorito')
      })
      .addCase(manageFavoriteCharacter.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
      })
  }
})

export const { setCharacters } = favoritesSlice.actions

export default favoritesSlice.reducer
