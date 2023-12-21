import { Typography } from "@mui/material";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate();
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
          <Typography variant="h5">123 bác sĩ</Typography>
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
          <Typography variant="h5">533 Bệnh viện/ Phòng khám</Typography>
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
          <Typography variant="h5">533 Chuyên khoa</Typography>
        </div>
      </div>
    </div>
  );
};

export default Featured;
