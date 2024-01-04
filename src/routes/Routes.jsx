import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import DoctorDetail from "../pages/doctor/doctor-detail/DoctorDetail";
import DoctorList from "../pages/doctor/doctor-list/DoctorList";
import Home from "../pages/home/HomePage/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DefaultLayout from "../layout/DefaultLayout";
import Layout2 from "../layout/Layout2";
import BookingHistory from "../pages/booking/BookingHistory";
import ClinicDetail from "../pages/clinic/ClinicDetail";
import ClinicList from "../pages/clinic/ClinicList";

const routes = {
  home: "/",
  login: "login",
  register: "register",
  doctorDetail: "doctor-detail/:id",
  doctorList: "doctor-list",
  bookingsHistory: "booking-history",
  clinicDetail: "clinic-detail/:id",
  clinicList: "clinic-list"
};

export const privateRoutes = [];

export const publicRoutes = [
  { path: routes.home, component: Home, layout: DefaultLayout },
  { path: routes.login, component: Login, layout: DefaultLayout },
  { path: routes.clinicDetail, component: ClinicDetail, layout: Layout2 },
  { path: routes.register, component: Register, layout: DefaultLayout },
  { path: routes.doctorList, component: DoctorList, layout: DefaultLayout },
  { path: routes.doctorDetail, component: DoctorDetail, layout: Layout2 },
  { path: routes.bookingsHistory, component: BookingHistory, layout: Layout2 },
  { path: routes.clinicList, component: ClinicList, layout: DefaultLayout },

];

export const IsLogin = () => {
  const { current } = useSelector((state) => state.auth);
  return current ? <Outlet /> : <Navigate to="/login" />;
};
