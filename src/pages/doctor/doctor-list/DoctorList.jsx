import { Box, Button, Typography } from "@mui/material";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getDoctors } from "../../../store/doctors/asyncAction";

const DoctorList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  return (
    <Box className="boxDoctorList">
      {doctors.map((doctor) => (
        <Box className="doctorCard">
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
      ))}
    </Box>
  );
};

export default DoctorList;
