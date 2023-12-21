import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getDoctors = createAsyncThunk(
  "doctor/doctorsFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllDoctors(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const getDoctorByID = createAsyncThunk(
  "doctor/doctor",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetDoctor(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
