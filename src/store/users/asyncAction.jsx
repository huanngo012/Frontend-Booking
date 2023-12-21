import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getUsers = createAsyncThunk(
  "user/usersFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllUsers(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiRegister(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);