import { Typography, Button, Divider, Box } from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import HomeIcon from "@mui/icons-material/Home";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCurrent } from "../../../store/auth/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/auth/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.auth);
  useEffect(() => {
    const setTimeoutID = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 24 * 60 * 60 * 1000);
    return () => {
      clearTimeout(setTimeoutID);
    };
  }, [dispatch, isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <div className="navbar">
        <div className="navContainer">
          <Typography
            variant="h4"
            fontFamily={"Ephesis, cursive"}
            className="navTitle"
            onClick={() => navigate("/")}
          >
            BookingApp
          </Typography>
          <div className="navItems">
            {isLoggedIn ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="text"
                    color="primary"
                    className="navButton"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    variant="text"
                    color="primary"
                    className="navButton"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    className="navButton"
                    onClick={() => navigate("/register")}
                  >
                    Đăng ký
                  </Button>
                </Box>
              </>
            )}
          </div>
        </div>
      </div>
      <Divider />
      <div className="navbarList">
        <div className="headerListItem">
          <HomeIcon />
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </span>
        </div>
        <div className="headerListItem">
          <VaccinesIcon />
          <span
            onClick={() => {
              navigate("/doctor-list");
            }}
          >
            Bác sĩ
          </span>
        </div>
        <div className="headerListItem">
          <LocalHospitalIcon />
          <span
            onClick={() => {
              navigate("/clinic-list");
            }}
          >
            Bệnh viện
          </span>
        </div>
        <div
          className="headerListItem"
          onClick={() => {
            navigate("/booking-history");
          }}
        >
          <CalendarMonthIcon />
          <span>Lịch khám</span>
        </div>
        {current?.role === 3 && (
          <div
            className="headerListItem"
            onClick={() => {
              navigate(`/doctor-detail/${current?._id}`);
            }}
          >
            <CalendarMonthIcon />
            <span>Thời gian làm việc</span>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
