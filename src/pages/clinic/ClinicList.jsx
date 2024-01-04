import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "../../hooks/useDebounce";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { getClinics } from "../../store/clinics/asyncAction";
import { resetClinicStatus } from "../../store/clinics/clinicSlice";

const ClinicList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clinics, successAction, errorAction } = useSelector(
    (state) => state.clinic
  );
  const [searchLabel, setSearchLabel] = useState(null);
  const [clinicsSearch, setClinicsSearch] = useState([]);

  const debounceSearchLabel = useDebounce(searchLabel, 700);
  useEffect(() => {
    if (searchLabel !== "") {
      dispatch(getClinics({ name: searchLabel }));
    } else {
      dispatch(getClinics());
    }
  }, [debounceSearchLabel]);
  useEffect(() => {
    setClinicsSearch(clinics);
  }, [clinics]);

  useEffect(() => {
    if (successAction || errorAction) {
      console.log(errorAction);
      if (errorAction) {
        setClinicsSearch([]);
      }
      dispatch(resetClinicStatus());
    }
  }, [successAction, errorAction]);

  return (
    <Box className="boxDoctorList">
      <Box className="headerSearch">
        <TextField
          type="text"
          placeholder="Nhập tên bệnh viện"
          className="headerSearchInput"
          onChange={(e) => setSearchLabel(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {clinicsSearch?.length > 0 ? (
        clinicsSearch?.map((el, index) => (
          <Box className="doctorCard" key={index}>
            <Box className="doctorCardHeader">
              <Box className="doctorImgBox">
                <img src={el?.image} className="doctor-img" alt="" />
              </Box>
              <Box className="doctorDescription">
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5">{el?.name}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body3">
                    {el?.address?.detail ? `${el?.address?.detail},` : ""}{" "}
                    {el?.address?.ward ? `${el?.address?.ward},` : ""}{" "}
                    {el?.address?.district ? `${el?.address?.district},` : ""}
                    {el?.address?.province}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body3">
                    Mô tả: {el?.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="cardContent">
              <Box className="cardBtn">
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate(`/clinic-detail/${el?._id}`);
                  }}
                >
                  Xem chi tiết
                </Button>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Box>Không tìm thấy bệnh viện</Box>
      )}
    </Box>
  );
};

export default ClinicList;
