import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getRequest, postRequest, deleteRequest } from '@/services/apiRequest.service'
import { setCharacters } from './favorites'
import { toast } from 'sonner'
import { type RootState } from '@/redux/store/store'
import { type Character } from '@/interfaces/character.interface'

interface State {
  characters: Character[]
  ownedCharacters: Character[]
  currentCharacter: Character | null
  index: number
  isError: boolean
  isLoading: boolean
}

const initialState: State = {
  characters: [],
  ownedCharacters: [],
  currentCharacter: null,
  index: 0,
  isError: false,
  isLoading: false
}

export const getCharacters = createAsyncThunk('characters/getCharacters', async (_, { dispatch, getState }) => {
  try {
    const state = getState() as RootState
    const userId = state?.authSession?.session?.current?.id
    const { data } = await getRequest('/characters', { ...(userId && { userId }) })
    dispatch(setCharacters(data.userFavorites))
    return {
      characters: data.apiCharacters as Character[],
      ownedCharacters: data.userCharacters as Character[]
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const getCharacterById = createAsyncThunk(
  'characters/getCharacterById',
  async (characterId: string, { getState }) => {
    try {
      const state = getState() as RootState
      const userId = state.authSession.session.current.id || null
      const { data: character } = await getRequest(`/characters/${characterId}`, { userId })
      return character as Character
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

export const createCharacter = createAsyncThunk('characters/createCharacter', async (character: any, { getState }) => {
  try {
    const state = getState() as RootState
    const userId = state.authSession.session.current.id || null
    character.userId = userId
    const { data } = await postRequest('/characters', character)
    return {
      character: data as Character
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const deleteCharacter = createAsyncThunk(
  'characters/deleteCharacter',
  async (characterId: string, { getState }) => {
    try {
      const state = getState() as RootState
      const userId = state.authSession.session.current.id || null
      const { data } = await deleteRequest(`/characters/${characterId}`, { userId })
      console.log('data', data)
      return {
        character: data as Character,
        characterId
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<any>) => {
      state.characters = action.payload
    },
    setIndex: (state, action: PayloadAction<number>) => {
      console.log('action.payload', action.payload)
      state.index = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.isLoading = false
        state.characters = action.payload.characters
        state.ownedCharacters = action.payload.ownedCharacters
        state.index = 0
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        console.error('error', action.error)
        toast.error('Error getting characters')
      })
      .addCase(getCharacterById.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getCharacterById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.currentCharacter = action.payload
      })
      .addCase(getCharacterById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        toast.error('Error getting character')
      })
      .addCase(createCharacter.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(createCharacter.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.currentCharacter = action.payload.character
        state.ownedCharacters.push(action.payload.character)
        toast.success('Character created')
      })
      .addCase(createCharacter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        toast.error('Error creating character')
      })
      .addCase(deleteCharacter.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(deleteCharacter.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.currentCharacter = action.payload.character
        state.ownedCharacters = state.ownedCharacters.filter(
          (character) => character.id.toString() !== action.payload.characterId
        )
        toast.success('Character deleted')
      })
      .addCase(deleteCharacter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        toast.error('Error deleting character')
      })
  }
})

export const { setCharacters: setCharactersAction, setIndex } = charactersSlice.actions

export default charactersSlice.reducer
