import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'

import authService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "/register",
  async ({ firstName, lastName, email, password, role }) => {
    try {
      const response = await authService.register(
        firstName,
        lastName,
        email,
        password,
        role
      );
      return response;
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
  authService.logout();
});

// const initialState = user
//   ? {
//       isLoggedIn: true,
//       user,
//     }
//   : {
//       isLoggedIn: false,
//       user: null,
//     };

const initialState = {
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
      state.isLoggedIn = true;
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
