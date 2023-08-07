import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { AuthClass, UserClass } from "@/types";
import { axiosPoster, axiosGetter } from "@/utils/requests";
import { sessionBuilder } from "@/utils/state";
import { setCurrentRoute } from "./system";

const initialState = {
  auth: {} as AuthClass,
  session: {
    current: {} as UserClass,
  },
};

export const setSession = createAsyncThunk(
  "auth/setSession",
  async (userId: string) => {
    try {
      const res = await axiosGetter({ url: `/users/${userId}` });
      console.log("res setSession", res);
      return res;
    } catch (err: any) {
      throw new Error("Error al loguear el usuario", err);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: any, { dispatch }) => {
    credentials.username = credentials.email;
    console.log("credentials", credentials);
    try {
      const res = await axiosPoster({ url: "/auth/login", body: credentials });
      console.log("res login", res);
      await dispatch(
        setCurrentRoute(
          `/?id=${res.User.userId}&status=ok&session=${res.SessionID}&loginMethod=local`
        )
      );
      return res;
    } catch (err: any) {
      throw new Error("Error al loguear el usuario", err);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: any) => {
    try {
      const res = await axiosPoster({ url: "/auth/register", body: userData });
      return res;
    } catch (err: any) {
      console.error("Error al crear el usuario", err);
      throw new Error("Error al crear el usuario", err);
    }
  }
);

const authSessionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthClass>) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.session = initialState.session;
      state.auth = initialState.auth;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {});
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.session.current = sessionBuilder(action.payload);
    });
    builder.addCase(login.rejected, (state) => {
      toast.error("Error al loguear el usuario");
    });
    builder.addCase(register.pending, (state) => {});
    builder.addCase(register.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.session.current = sessionBuilder(action.payload);
    });
    builder.addCase(register.rejected, (state) => {
      toast.error("Error al crear el usuario");
    });
  },
});

export const { logout, setAuth } = authSessionSlice.actions;

export default authSessionSlice.reducer;
