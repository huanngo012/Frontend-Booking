import {
  Avatar,
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import './style.scss';
import LockPersonIcon from '@mui/icons-material/LockPerson';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../redux/store/store';
// import { register } from '../../redux/slice/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [gender, setGender] = useState('MALE');
  // const [error, setError] = useState<string | null>(null);
  // const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //     setGender(event.target.value as string);
  // };

  // const handleRegister = () => {
  //     // Lấy giá trị từ các trường nhập liệu
  //     const fullName = (document.getElementById('fullName') as HTMLInputElement)?.value || '';
  //     const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
  //     const password = (document.getElementById('password') as HTMLInputElement)?.value || '';
  //     const mobile = (document.getElementById('mobile') as HTMLInputElement)?.value || '';
  //     if (!fullName || !email || !password || !mobile) {
  //         // Sử dụng toast để hiển thị thông báo lỗi
  //         toast.error('Vui lòng nhập đầy đủ thông tin');
  //         return;
  //     }
  //     try {
  //         dispatch(register(email, password, fullName, mobile, gender));
  //         toast.success('Đăng ký thành công!');
  //         navigate('/login');
  //     } catch (error) {
  //         // Sử dụng toast để hiển thị thông báo lỗi từ action
  //         toast.error(String(error));
  //     }

  // };

  return (
    <Box className="registerPage">
      <ToastContainer position="top-right" autoClose={3000} />
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
            <Box sx={{ flex: 1 }}>
              <Box className="tField">
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Họ và tên"
                  name="fullName"
                  autoComplete="fullName"
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Box>
              <Box className="tField">
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Box>
              <Box className="tField">
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  autoComplete="password"
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Box>
              <Box className="tField">
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Số điện thoại"
                  name="mobile"
                  autoComplete="mobile"
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
              </Box>
              <Box className="tField">
                <TextField
                  select
                  label="Giới tính"
                  fullWidth
                  // value={gender}
                  // onChange={handleGenderChange}
                  variant="outlined"
                  InputProps={{ style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                >
                  <MenuItem value="MALE">Nam</MenuItem>
                  <MenuItem value="FEMALE">Nữ</MenuItem>
                </TextField>
              </Box>
              <Box className="registerBtnBox">
                <Button
                  //onClick={handleRegister}
                  type="submit"
                  variant="outlined"
                  fullWidth
                  className="registerBtn"
                  size="medium"
                >
                  Đăng ký
                </Button>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={2} className="tField">
                  <Typography
                    variant="body2"
                    component="span"
                    //style={{marginTop: '10px'}}
                  >
                    Bạn đã có tài khoản?{' '}
                    <Typography
                      variant="body2"
                      component="span"
                      // onClick={() => {
                      //   navigate('/login');
                      // }}
                      sx={{ cursor: 'pointer' }}
                    >
                      Đăng nhập ngay
                    </Typography>
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
export default Register;

// import React from 'react'

// const Register = () => {
//   return (
//     <Box>Register</Box>
//   )
// }

// export default Register
