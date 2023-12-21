import axios from "../axios";

export const apiGetBookingsByPatientID = (id) =>
  axios({
    url: `/booking/patient/${id}`,
    method: "get",
  });
export const apiGetAllBookings = (params) =>
  axios({
    url: `/booking`,
    method: "get",
    params,
  });
export const apiAddBooking = (data) =>
  axios({
    url: `/booking/patient`,
    method: "post",
    data,
  });
export const apiUpdateBooking = (id, data) =>
  axios({
    url: `/booking/${id}`,
    method: "put",
    data,
  });
export const apiCancelBooking = (id) =>
  axios({
    url: `/booking/patient/${id}`,
    method: "put",
  });
export const apiAddBookingByPatient = (data) =>
  axios({
    url: "/booking/patient",
    method: "post",
    data,
  });
