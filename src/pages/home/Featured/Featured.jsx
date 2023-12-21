import { Typography } from "@mui/material";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as apis from "../../../apis";
import { formatMoney } from "../../../utils/helper";

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
    <div className="featured">
      <div
        className="featuredItem"
        onClick={() => {
          navigate("/doctor-list");
        }}
      >
        <img
          src="https://niptdanang.com/wp-content/uploads/2021/09/02407841.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <Typography variant="h4">Bác sĩ</Typography>
          <Typography variant="h5">
            {formatMoney(+countDoctor)} Bác sĩ
          </Typography>
        </div>
      </div>
      <div
        className="featuredItem"
        onClick={() => {
          navigate("/clinic-list");
        }}
      >
        <img
          // src="http://thanhnhanhospital.vn/upload/images/yeu-cau-thiet-ke-phong-mo-benh-vien-an-toan.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <Typography variant="h4">Bệnh viện/ Phòng khám</Typography>
          <Typography variant="h5">
            {formatMoney(+countClinic)} Bệnh viện/ Phòng khám
          </Typography>
        </div>
      </div>
      <div
        className="featuredItem"
        onClick={() => {
          navigate("/specialtie-list");
        }}
      >
        <img
          src="https://bvdaihoccoso2.com.vn/uploads/bai-viet/lo-go-khoa-tai-mui-hong.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <Typography variant="h4">Chuyên khoa</Typography>
          <Typography variant="h5">
            {formatMoney(+countSpecialty)} Chuyên khoa
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Featured;
