import axios from "../axios";

export const apiGetAllSpecialtys = (params) =>
  axios({
    url: "/specialty",
    method: "get",
    params,
  });

export const apiGetSpecialty = (id) =>
  axios({
    url: `/specialty/${id}`,
    method: "get",
  });
export const apiCountSpecialty = () =>
  axios({
    url: `/specialty/count`,
    method: "get",
  });
