import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPoster, axiosDeleter, axiosGetter } from "@/utils/requests";
import { setCharacters } from "./favorites";
import { toast } from "sonner";
import { RootState } from "@/redux/store/store";

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
      const state = getState() as RootState;
      const userId = state.authSession.session.current.id || null;
      console.log("axiosGetter headers", userId);
      const res = await axiosGetter({
        url: `/characters`,
        headers: { userId: userId },
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
      const state = getState() as RootState;
      const userId = state.authSession.session.current.id || null;
      const res = await axiosGetter({
        url: `/characters/${characterId}`,
        headers: { userId: userId },
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

export const createCharacter = createAsyncThunk(
  "characters/createCharacter",
  async (character: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const userId = state.authSession.session.current.id || null;
      character.userId = userId;
      //const userId = state.client.session.current.userId;
      const res = await axiosPoster({
        url: `/characters`,
        body: character,
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

export const deleteCharacter = createAsyncThunk(
  "characters/deleteCharacter",
  async (characterId: string, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const userId = state.authSession.session.current.id || null;
      const res = await axiosDeleter({
        url: `/characters/${characterId}`,
        headers: { userId: userId },
      });

      console.log("data redux", res);
      return {
        character: res,
        characterId: characterId,
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
        console.error("error", action.error);
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
      })
      .addCase(createCharacter.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.currentCharacter = action.payload.character;
        state.ownedCharacters.push(action.payload.character);
        console.log("action.payload.character", action.payload.character);
        toast.success("Character created");
      })
      .addCase(createCharacter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Error creating character");
      })
      .addCase(deleteCharacter.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteCharacter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        console.log("action.payload.character", action.payload);
        state.currentCharacter = action.payload.character;
        state.ownedCharacters = state.ownedCharacters.filter(
          (character) => character.id !== action.payload.characterId
        );
        toast.success("Character deleted");
      })
      .addCase(deleteCharacter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Error deleting character");
      });
  },
});

export const { setCharacters: setCharactersAction, setIndex } =
  charactersSlice.actions;

export default charactersSlice.reducer;
