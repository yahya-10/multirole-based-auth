import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "/register",
  async ({ email, password, role }, thunkAPI) => {
    try {
      const response = await authService.register(email, password, role);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const login = createAsyncThunk(
  "/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      return { user: data };
    } catch (error) {
      console.error(error);
    }
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  await authService.logout();
});

const initialState = user
  ? {
      isLoggedIn: true,
      user,
    }
  : {
      isLoggedIn: false,
      user: null,
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [register.fulfilled]: (state) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
