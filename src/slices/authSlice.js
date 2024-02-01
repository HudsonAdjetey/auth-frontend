import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  status: "idle",
};

const URL = "http://localhost:5000";

export const loginUser = createAsyncThunk("loginUser", async (body) => {
  try {
    // const {email, password} = auth
    const res = await axios.post(`/api/users/auth`, body);
    return res;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setCredentials: (state, action) => {
    //     state.userInfo = action.payload
    //     localStorage.setItem('userInfo', JSON.stringify(action.payload))
    // },
    // clearCredentials: (state, action) => {
    //     state.userInfo = null
    //     localStorage.removeItem('userInfo')
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        // code here to handle the pending status of request
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // code here to handle the fulfilled status of request
        state.status = "succeeded";
        state.userInfo = action.payload.data;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        // code here to handle the rejected status of request
        state.status = "failed";
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
