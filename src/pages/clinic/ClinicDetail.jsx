import React, { useEffect, useState } from "react";
import "./style.scss";
import { Box, Typography, Divider, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import * as apis from "../../apis";
import { getDoctors } from "../../store/doctors/asyncAction";
import Doctor from "./Doctor";
import { Helmet } from "../../components";

const ClinicDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { doctors } = useSelector((state) => state.doctor);

  const [clinic, setClinic] = useState({});

  const fetchClinic = async () => {
    const response = await apis.apiGetClinic(id);
    if (response.success) {
      setClinic(response?.data);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, [dispatch]);

  useEffect(() => {
    if (clinic) {
      dispatch(getDoctors({ nameClinic: clinic?.name }));
    }
  }, [clinic]);

  return (
    <Helmet title="Chi tiết bệnh viện">
      <Box className="clinic">
        <Box className="clinic-image-box">
          <img
            alt="Phòng khám Đa khoa Victoria Healthcare Quận 7"
            className="clinic-image"
            sizes="100vw"
            src="https://cdn.bookingcare.vn/fo/w640/2023/11/01/141139-camnanghoidap.jpeg"
          />
          <Box className="additional-box">
            <Stack
              direction="row"
              width="100%"
              gap="30px"
              alignItems="center"
              height="100%"
              marginLeft="20px"
            >
              <Box
                component="img"
                src={clinic?.image}
                alt=""
                sx={{ objectFit: "contain", width: "15%" }}
              />
              <Box>
                <Typography variant="h5">{clinic?.name}</Typography>
                <Typography variant="body2">
                  {clinic?.address?.detail ? `${clinic?.address?.detail},` : ""}{" "}
                  {clinic?.address?.ward ? `${clinic?.address?.ward},` : ""}{" "}
                  {clinic?.address?.district
                    ? `${clinic?.address?.district},`
                    : ""}
                  {clinic?.address?.province}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box className="card-bio">
            <Box className="desc-clinic-1">
              <Typography>
                BookingApp là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu
                Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám
                uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ,
                sản phẩm y tế chất lượng cao.
              </Typography>
            </Box>
            <Box className="desc-clinic-2">
              <div>
                <Typography variant="body2">
                  Hãy đặt khám với{" "}
                  <Typography component="span">{clinic?.name}</Typography> trên
                  Nền tảng Y tế Chăm sóc sức khỏe toàn diện Booking:
                </Typography>
                <ul>
                  <li>
                    Được lựa chọn khám với các bác sĩ chuyên khoa giàu kinh
                    nghiệm, dịch vụ y tế chất lượng
                  </li>
                  <li>
                    Đặt hẹn trực tuyến &amp; nhận hướng dẫn chi tiết trước khi
                    đi khám&nbsp;(miễn phí)
                  </li>
                  <li>Giảm thiểu thời gian chờ đợi</li>
                </ul>
              </div>
            </Box>
          </Box>
        </Box>
        <Box className="clinic-body-box">
          <Box className="clinic-box-header">
            <Typography variant="h5">Bác sĩ</Typography>
          </Box>
          <Divider />
          <Stack direction="column" gap="20px">
            {doctors?.map((el, index) => (
              <Box key={index}>
                <Doctor data={el} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Helmet>
  );
};

export default ClinicDetail;
