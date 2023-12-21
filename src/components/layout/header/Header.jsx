import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <Typography variant="label2">
          Nền tảng y tế sức khỏe toàn diện
        </Typography>
        <Typography variant="body2">
          Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
        </Typography>
      </div>
    </div>
  );
};

export default Header;
