import {
  Avatar,
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Select,
} from "@mui/material";
import "./style.scss";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/users/asyncAction";
import useNotification from "../../hooks/useNotification";
import { resetUserStatus } from "../../store/users/userSlice";
// import { AppDispatch, RootState } from '../../redux/store/store';
// import { register } from '../../redux/slice/auth/authSlice';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();
  const { errorAction, successAction } = useSelector((state) => state.user);

  const [gender, setGender] = useState("MALE");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleRegister = () => {
    // Lấy giá trị từ các trường nhập liệu
    const fullName = document.getElementById("fullName")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const password = document.getElementById("password")?.value || "";
    const mobile = document.getElementById("mobile")?.value || "";
    if (!fullName || !email || !password || !mobile) {
      displayNotification({
        message: "Vui lòng nhập đầy đủ",
        severity: "error",
        title: "Thất bại",
      });
      return;
    }
    dispatch(register({ email, password, fullName, mobile, gender }));
  };

  useEffect(() => {
    if (successAction || errorAction) {
      displayNotification({
        message: successAction || errorAction,
        severity: successAction ? "success" : "error",
        title: successAction ? "Thành công" : "Thất bại",
      });
      dispatch(resetUserStatus());
    }
  }, [successAction, errorAction]);

  return (
    <Box className="registerPage">
      <Box className="registerBox">
        <Box className="leftRgBox">
          <Box
            component="img"
            className="registerImg"
            src="https://img.pikbest.com/png-images/20211011/cartoon-man-sitting-at-home-with-laptop_6140580.png!bw700"
            alt=""
          />
        </Box>
        <Box className="rightRgBox">
          <Container>
            <Box height={10} />
            <Box className="avtBox">
              <Avatar className="avatar">
                <LockPersonIcon />
              </Avatar>
              <Typography component="h2" variant="h4">
                Đăng ký tài khoản
              </Typography>
            </Box>
            <Stack direction="column" gap="20px">
              <Stack>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Họ và tên"
                  name="fullName"
                  autoComplete="fullName"
                />
              </Stack>
              <Box>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Box>
              <Box>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  autoComplete="password"
                />
              </Box>
              <Stack direction="row" gap="10px" alignItems="center">
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Số điện thoại"
                  name="mobile"
                  autoComplete="mobile"
                />
                <Box>
                  <Typography variant="label1">Giới tính</Typography>
                  <Select
                    select
                    label="Giới tính"
                    value={gender}
                    onChange={handleGenderChange}
                    variant="outlined"
                    sx={{
                      height: "40px",
                      backgroundColor: "white",
                      borderRadius: "6px",
                      marginTop: "4px",
                    }}
                    size="small"
                  >
                    <MenuItem value="MALE">Nam</MenuItem>
                    <MenuItem value="FEMALE">Nữ</MenuItem>
                  </Select>
                </Box>
              </Stack>

              <Button
                onClick={handleRegister}
                type="submit"
                variant="outlined"
                fullWidth
                className="registerBtn"
                size="medium"
                sx={{ width: "100%" }}
              >
                Đăng ký
              </Button>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2" component="span">
                    Bạn đã có tài khoản?{" "}
                    <Typography
                      variant="body2"
                      component="span"
                      onClick={() => {
                        navigate("/login");
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      Đăng nhập ngay
                    </Typography>
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
export default Register;
