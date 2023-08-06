import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPoster, axiosDeleter, axiosGetter } from "@/utils/requests";
import { setCharacters } from "./favorites";

const initialState = {
  characters: [] as any[],
  ownedCharacters: [] as any[],
  index : 0 | 1 | 2 | 3,
  isError: false,
  isLoading: false,
};

export const getCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as any;
      const userId = state.client.session.current.userId;
      const { data } = await axiosGetter({
        url: `/characters`,
        body: { userId },
      });

      await dispatch(setCharacters(data.favorites));

      return {
        characters: data.characters,
        ownedCharacters: data.ownedCharacters,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<any>) => {
      state.characters = action.payload;
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload.characters;
        state.ownedCharacters = action.payload.ownedCharacters;
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setCharacters: setCharactersAction } = charactersSlice.actions;

export default charactersSlice.reducer;
