import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type UserInfo = {
  id: string;
  email: string;
  token: string;
};

type AuthState = {
  userInfo: UserInfo | null;
  error: string | null | undefined;
  loading: boolean;
  success: string | null;
};

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : null;
const parsedUserInfo = userInfoFromLocalStorage
  ? JSON.parse(userInfoFromLocalStorage)
  : null;

const initialState: AuthState = {
  userInfo: parsedUserInfo,
  error: null,
  loading: false,
  success: null
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      if (email && password) {
        const res = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });

        if (res || res !== null || undefined) {
          console.log(res.data);
          return res.data;
        }
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      if (email && password) {
        const res = await axios.post("http://localhost:3000/signup", {
          email,
          password,
        });

        if (res) {
          console.log(res.data);
        }
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    clearError : (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.userInfo
        ? localStorage.setItem("userInfo", JSON.stringify(action.payload))
        : null;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      console.log(state.error);
      state.userInfo = null;
      
    });
    builder.addCase(signUpUser.fulfilled, (state) => {
      state.success = "Signup Successful"
      state.error = null;

    });
    builder.addCase(signUpUser.rejected, (state,action) => {
      state.error = action.error.message
    });
  },
});

export const { logout,clearError } = authSlice.actions;
export default authSlice.reducer;
