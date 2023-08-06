import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPoster, axiosDeleter } from "@/utils/requests";
import { toast } from "sonner";
import { RootState } from "@/redux/store/store";

const initialState = {
  characters: [] as any[],
  isError: false,
  isLoading: false,
};

export const manageFavoriteCharacter = createAsyncThunk(
  "favorites/manageFavoriteCharacter",
  async (character: any, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const userId = state.client.session.current.userId;
      const isAlreadyFavorite = state.client.favorites.characters.find(
        (c: any) => c.id === character.id,
      );

      if (isAlreadyFavorite) {
        const response = await axiosDeleter(
          `/client/favorites/${character.id}`,
        );
        return response;
      } else {
        const response = await axiosPoster(`/favorites`, {
          defaultCharacterId: character.id,
        });
        return {
          data: response.data,
          operation: isAlreadyFavorite ? "delete" : "add",
        };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<any>) => {
      state.characters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(manageFavoriteCharacter.fulfilled, (state, action) => {
        const { data, operation } = action.payload;
        if (operation === "add") {
          state.characters.push(data as any);
        } else {
          state.characters = state.characters.filter(
            (c: any) => c.id !== data.id,
          );
        }
      })
      .addCase(manageFavoriteCharacter.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        toast.error("Error al gestionar favorito");
      })
      .addCase(manageFavoriteCharacter.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export const { setCharacters } = favoritesSlice.actions;

export default favoritesSlice.reducer;
