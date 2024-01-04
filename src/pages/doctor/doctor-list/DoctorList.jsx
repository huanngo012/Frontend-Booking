import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getDoctors } from "../../../store/doctors/asyncAction";
import useDebounce from "../../../hooks/useDebounce";
import { resetDoctorStatus } from "../../../store/doctors/doctorSlice";
import { Helmet } from "../../../components";

const DoctorList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctors, successAction, errorAction } = useSelector(
    (state) => state.doctor
  );
  const [searchLabel, setSearchLabel] = useState(null);
  const [doctorsSearch, setDoctorsSearch] = useState([]);

  const debounceSearchLabel = useDebounce(searchLabel, 700);
  useEffect(() => {
    dispatch(getDoctors({ fullName: searchLabel }));
  }, [debounceSearchLabel]);
  useEffect(() => {
    setDoctorsSearch(doctors);
  }, [doctors]);

  useEffect(() => {
    if (successAction || errorAction) {
      if (errorAction) {
        setDoctorsSearch([]);
      }
      dispatch(resetDoctorStatus());
    }
  }, [successAction, errorAction]);

  return (
    <Helmet title="Danh sách bác sĩ">
      <Box className="boxDoctorList">
        <Box className="headerSearch">
          <TextField
            type="text"
            placeholder="Nhập tên bác sĩ"
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
        {doctorsSearch?.length > 0 ? (
          doctorsSearch?.map((doctor, index) => (
            <Box className="doctorCard" key={index}>
              <Box className="doctorCardHeader">
                <Box className="doctorImgBox">
                  <img
                    src="https://png.pngtree.com/png-vector/20221006/ourlarge/pngtree-chibi-doctor-kids-cute-boy-png-image_6288993.png"
                    className="doctor-img"
                    alt=""
                  />
                </Box>
                <Box className="doctorDescription">
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5">
                      Bác sĩ {doctor._id.fullName}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body3">
                      {doctor.specialtyID.name} - {doctor.clinicID.name}
                    </Typography>
                    <Typography variant="body3">
                      Liên hệ: {doctor._id.mobile}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="cardContent">
                <Box className="cardBtn">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate(`/doctor-detail/${doctor._id._id}`);
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box>Không tim thấy bác sĩ</Box>
        )}
      </Box>
    </Helmet>
  );
};

export default DoctorList;
