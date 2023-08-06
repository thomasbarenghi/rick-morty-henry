import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPoster, axiosDeleter, axiosGetter } from "@/utils/requests";
import { setCharacters } from "./favorites";
import { toast } from "sonner";

const initialState = {
  characters: [] as any[],
  ownedCharacters: [] as any[],
  currentCharacter: {} as any,
  index: 0 | 1 | 2 | 3,
  isError: false,
  isLoading: false,
};

export const getCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as any;
      //   const userId = state.client.session.current.userId || "";
      const res = await axiosGetter({
        url: `/characters`,
        //   body: { userId },
      });
      console.log("res", res);
      await dispatch(setCharacters(res.userFavorites));

      return {
        characters: res.apiCharacters,
        ownedCharacters: res.userCharacters,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getCharacterById = createAsyncThunk(
  "characters/getCharacterById",
  async (characterId: string, { dispatch, getState }) => {
    try {
      const state = getState() as any;
      //const userId = state.client.session.current.userId;
      const res = await axiosGetter({
        url: `/characters/${characterId}`,
        //   body: { userId },
      });

      console.log("data redux", res);
      return {
        character: res,
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
        state.index = 0;
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("error", action);
        toast.error("Error getting characters");
      })
      .addCase(getCharacterById.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCharacterById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.currentCharacter = action.payload.character;
      })
      .addCase(getCharacterById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Error getting character");
      });
  },
});

export const { setCharacters: setCharactersAction, setIndex } =
  charactersSlice.actions;

export default charactersSlice.reducer;
