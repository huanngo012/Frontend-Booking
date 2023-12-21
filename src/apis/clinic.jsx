import axios from "../axios";

export const apiGetAllClinics = (params) =>
  axios({
    url: "/clinic/",
    method: "get",
    params,
  });

export const apiGetClinic = (id) =>
  axios({
    url: `/clinic/${id}`,
    method: "get",
  });
export const apiCountClinic = () =>
  axios({
    url: `/clinic/count`,
    method: "get",
  });
