import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const clinicSlice = createSlice({
  name: "clinic",
  initialState: {
    loading: false,
    successAction: null,
    errorAction: null,
    totalItem: null,
    clinics: [],
  },
  reducers: {
    resetClinicStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getClinics.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getClinics.fulfilled, (state, action) => {
      state.clinics = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getClinics.rejected, (state, action) => {
      state.errorAction = action.payload.data;
      state.loading = false;
    });
  },
});

export const { resetClinicStatus } = clinicSlice.actions;
export default clinicSlice.reducer;
