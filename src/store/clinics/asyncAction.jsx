import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getClinics = createAsyncThunk(
  "clinic/clinicsFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllClinics(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
