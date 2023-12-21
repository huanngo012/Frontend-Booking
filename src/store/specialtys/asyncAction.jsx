import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getSpecialtys = createAsyncThunk(
  "specialty/specialtysFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllSpecialtys(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
