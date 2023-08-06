import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PlatformsClass } from "@/types";

const initialState = {
  platforms: [] as PlatformsClass[],
};

const platformsSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    setPlatforms: (state, action: PayloadAction<PlatformsClass[]>) => {
      state.platforms = action.payload as PlatformsClass[];
    },
  },
  extraReducers: (builder) => {},
});

export const { setPlatforms } = platformsSlice.actions;

export default platformsSlice.reducer;
