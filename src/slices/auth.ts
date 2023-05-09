import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

import ApiService from "../services/ApiService";
import parseJwt from "../helpers/parseJwt";
import User from "../types/User";
import Address from "../types/Address";
import AccountStatus from "../types/AccountStatus";

interface LoginPayload {
  token?: string;
  username?: string;
  password?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  loggedIn: boolean;
}

const TOKEN_KEY = "tokenLoader";

const authApi = AuthService.getInstance();

const initialState: AuthState = {
  user: null,
  loading: false,
  loggedIn: false,
};

export const userLogin = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      let token = data.token;
      if (!token) {
        const resp = await authApi.authenticateUser(data.username!, data.password!);
        token = resp.token;
      }

      ApiService.setToken(token);
      const username = parseJwt(token).username;
      // RETRIEVE USER BY USERNAME USING USER SERVICE, THEN RETURN THE USER

      // THIS IS A TEMPORARY USER. REMOVE THIS
      const TEMP_USER = new User(
        "000",
        "TEST",
        "USER",
        "NOEMAIL",
        "NOPHONE",
        new Address("TEST", null, "CITY", "NOSTATE", 20002),
        AccountStatus.OPEN,
        { name: "EMPLOYEE", description: "TEST EMPLOYEE" }
      );
      return { token: token, user: TEMP_USER };
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const setLoading = (state: AuthState) => {
  state.loading = true;
};

const logout = (state: AuthState) => {
  ApiService.setToken("");
  localStorage.setItem(TOKEN_KEY, "");
  state.loggedIn = false;
  state.user = initialState.user;
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout,
    setLoading,
  },
  extraReducers: (builder) =>
    builder
      .addCase(userLogin.pending, setLoading)
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        if (payload!.token) localStorage.setItem(TOKEN_KEY, payload!.token);
        state.user = payload!.user;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        localStorage.setItem(TOKEN_KEY, "");
        state.loading = false;
      }),
});

export const { authState } = {
  authState: authSlice.actions,
};

export default authSlice;
