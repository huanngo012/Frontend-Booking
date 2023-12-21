import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const specialtySlice = createSlice({
  name: "clinic",
  initialState: {
    loading: false,
    successAction: null,
    errorAction: null,
    totalItem: null,
    specialtys: [],
  },
  reducers: {
    resetSpecialtyStatus: (state) => {
      state.successAction = null;
      state.errorAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getSpecialtys.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actions.getSpecialtys.fulfilled, (state, action) => {
      state.specialtys = action.payload.data;
      state.totalItem = action.payload.counts;
      state.loading = false;
    });
    builder.addCase(actions.getSpecialtys.rejected, (state, action) => {
      state.errorAction = action.message;
      state.loading = false;
    });
  },
});

export const { resetSpecialtyStatus } = specialtySlice.actions;
export default specialtySlice.reducer;
