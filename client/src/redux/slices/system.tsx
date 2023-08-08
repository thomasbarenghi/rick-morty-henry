import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentRoute: "",
};

const postsSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setCurrentRoute: (state, action: PayloadAction<string>) => {
      console.log("setCurrentRoute", action.payload);
      state.currentRoute = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCurrentRoute } = postsSlice.actions;

export default postsSlice.reducer;
