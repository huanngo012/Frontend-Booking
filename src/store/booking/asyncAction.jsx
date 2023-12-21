import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getBookings = createAsyncThunk(
  "Booking/bookingsFetch",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllBookings(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const addBooking = createAsyncThunk(
  "booking/addBooking",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiAddBooking(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiCancelBooking(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
