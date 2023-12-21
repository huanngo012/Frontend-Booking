import { Typography, Box } from "@mui/material";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as apis from "../../../apis";
import { formatMoney } from "../../../utils/helper";
import icons from "../../../utils/icons";

const Featured = () => {
  const navigate = useNavigate();
  const [countDoctor, setCountDoctor] = useState(0);
  const [countClinic, setCountClinic] = useState(0);
  const [countSpecialty, setCountSpecialty] = useState(0);

  const fetchCountDoctor = async () => {
    const response = await apis.apiCountDoctor();

    if (response.success) {
      setCountDoctor(response?.data[1]);
    }
    return response;
  };
  const fetchCountClinic = async () => {
    const response = await apis.apiCountClinic();

    if (response.success) {
      setCountClinic(response?.data[1]);
    }
    return response;
  };
  const fetchCountSpecialty = async () => {
    const response = await apis.apiCountSpecialty();

    if (response.success) {
      setCountSpecialty(response?.data[1]);
    }
    return response;
  };

  useEffect(() => {
    fetchCountDoctor();
    fetchCountClinic();
    fetchCountSpecialty();
  }, []);

  return (
    <Box className="featured">
      <Box
        className="featuredItem"
        onClick={() => {
          navigate("/doctor-list");
        }}
      >
        <img
          src="https://htmediagroup.vn/wp-content/uploads/2022/12/Anh-bac-si-3-min.jpg"
          alt=""
          className="featuredImg"
        />
        <Box className="featuredTitles">
          <Typography variant="h4">Bác sĩ</Typography>
          <Typography variant="h5">
            {formatMoney(+countDoctor)} Bác sĩ
          </Typography>
        </Box>
      </Box>
      <Box
        className="featuredItem"
        onClick={() => {
          navigate("/clinic-list");
        }}
      >
        <img
          src="https://media.istockphoto.com/id/1364075546/vi/anh/h%C3%A0nh-lang-tr%E1%BB%91ng-trong-b%E1%BB%87nh-vi%E1%BB%87n-hi%E1%BB%87n-%C4%91%E1%BA%A1i-v%E1%BB%9Bi-qu%E1%BA%A7y-th%C3%B4ng-tin-v%C3%A0-gi%C6%B0%E1%BB%9Dng-b%E1%BB%87nh-trong-ph%C3%B2ng-3d-k%E1%BA%BFt.jpg?s=612x612&w=0&k=20&c=PdvfS-ORNo8at21AvwA4Ymbo9pgsnKfDr0KzAE5BBUA="
          alt=""
          className="featuredImg"
        />
        <Box className="featuredTitles">
          <Typography variant="h4">Bệnh viện/ Phòng khám</Typography>
          <Typography variant="h5">
            {formatMoney(+countClinic)} Bệnh viện/ Phòng khám
          </Typography>
        </Box>
      </Box>
      <Box
        className="featuredItem"
        onClick={() => {
          navigate("/specialtie-list");
        }}
      >
        <img
          src="https://benhviensante.com/Data/Sites/1/media/chuyenkhoa/chuyenkhoanew/chuandoan.jpg"
          alt=""
          className="featuredImg"
        />
        <Box className="featuredTitles">
          <Typography variant="h4">Chuyên khoa</Typography>
          <Typography variant="h5">
            {formatMoney(+countSpecialty)} Chuyên khoa
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Featured;
