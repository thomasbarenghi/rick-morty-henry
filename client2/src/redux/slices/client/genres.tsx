import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GenresClass } from "@/types";

const initialState = {
  genres: [] as GenresClass[],
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<GenresClass[]>) => {
      if (!Array.isArray(action.payload) || action.payload.length === 0) {
        return;
      }
      state.genres = action.payload as GenresClass[];
    },
  },
  extraReducers: (builder) => {},
});

export const { setGenres } = genresSlice.actions;

export default genresSlice.reducer;
