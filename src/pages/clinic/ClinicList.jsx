import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";

const ClinicList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchLabel, setSearchLabel] = useState(null);
  return (
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
                  <SearchIcon/>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className="doctorCard" key={''}>
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
                    Bệnh viện Đại học Y dược TP.HCM
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body3">
                    Số 215, đường Hồng Bàng, Phường 11, Quận 5,Thành phố Hồ Chí Minh
                  </Typography>
                  <Typography variant="body3">
                    Bệnh viện có 10 bác sĩ thuộc nhiều chuyên khoa
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="cardContent">
              <Box className="cardBtn">
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate(`/doctor-detail/`);
                  }}
                >
                  Xem chi tiết
                </Button>
              </Box>
            </Box>
        </Box>
    </Box>

  )
}

export default ClinicList