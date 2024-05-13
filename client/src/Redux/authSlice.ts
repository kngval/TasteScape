import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type AuthState = {
  userInfo: string | null;
};

const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
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

        if (res) {
          return res.data;
        }
      }
    } catch (error) {
      console.log(error);
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
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
