import axios from "../axios";

export const apiGetAllDoctors = (params) =>
  axios({
    url: `doctor/`,
    method: "get",
    params,
  });
export const apiGetDoctor = (id) =>
  axios({
    url: `doctor/${id}`,
    method: "get",
  });

export const apiCountDoctor = () =>
  axios({
    url: `/doctor/count`,
    method: "get",
  });

export const apiCommentDoctor = (data) =>
  axios({
    url: `/doctor/rating`,
    method: "put",
    data,
  });
