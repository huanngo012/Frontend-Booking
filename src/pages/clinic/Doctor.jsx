import React, { useEffect, useState } from "react";
import { Popup, SelectDate } from "../../components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Typography, Button } from "@mui/material";
import { formatMoney } from "../../utils/helper";
import * as apis from "../../apis";
import { times } from "../../utils/contants";
import useNotification from "../../hooks/useNotification";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../store/booking/asyncAction";
import { useNavigate } from "react-router-dom";
import { resetBookingStatus } from "../../store/booking/bookingSlice";

const Doctor = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { displayNotification } = useNotification();
  const { errorAction, successAction } = useSelector((state) => state.booking);
  const { current } = useSelector((state) => state.auth);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openPopUpLogin, setOpenPopUpLogin] = useState(false);
  const [date, setDate] = useState(new Date().getTime());
  const [schedule, setSchedule] = useState({});
  const [time, setTime] = useState("");

  const getScheduleByDoctorID = async () => {
    const response = await apis.apiGetAllSchedules({
      doctorID: data?._id?._id,
      date: date,
    });
    if (response?.success) {
      setSchedule(response?.data[0]);
    } else {
      setSchedule({});
    }
  };
  useEffect(() => {
    getScheduleByDoctorID();
  }, [date]);

  const handleCheckLogin = (e, time) => {
    if (current) {
      if (current?.role === 4) {
        handleOpenConfirmPopup(e);
        setTime(time);
      } else {
        displayNotification({
          message: "Bạn không thể đặt lịch!!!",
          severity: "error",
          title: "Thất bại",
        });
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
      setOpenPopUpLogin(true);
    }
  };

  const handleOpenConfirmPopup = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenPopUp(true);
  };
  const handleCloseConfirmPopUp = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPopUp(false);
  };
  const handleCloseConfirmPopUpLogin = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPopUpLogin(false);
  };
  const handleBooking = () => {
    dispatch(addBooking({ scheduleID: schedule?._id, time }));
    setOpenPopUp(false);
  };

  useEffect(() => {
    if (successAction || errorAction) {
      displayNotification({
        message: successAction || errorAction,
        severity: successAction ? "success" : "error",
        title: successAction ? "Thành công" : "Thất bại",
      });
      dispatch(resetBookingStatus());
    }
  }, [successAction, errorAction]);

  return (
    <Box className="doctor-clinic-detail">
      <Box className="doctor-clinic-detail-1">
        <Box>
          <img
            src="https://png.pngtree.com/png-vector/20221006/ourlarge/pngtree-chibi-doctor-kids-cute-boy-png-image_6288993.png"
            className="doctor-img"
            alt=""
          />
        </Box>
        <Box className="">
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">{data?._id?.fullName}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className="truncate_2"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="label1">
              Chuyên khoa: {data?.specialtyID?.name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="doctor-clinic-detail-2">
        <Box className="datePicker">
          <SelectDate
            label="Chọn ngày:"
            value={date}
            setValue={setDate}
            nameKey="date"
          />
        </Box>
        <Box className="calendar">
          <CalendarMonthIcon />
          <Typography variant="body2">Lịch khám</Typography>
        </Box>
        {Object.keys(schedule).length > 0 ? (
          <Box className="boxSchedule">
            {schedule?.timeType?.map((el, index) => (
              <Box key={index} sx={{ width: "33,333%", padding: "10px" }}>
                <Button
                  variant={"outlined"}
                  sx={{ width: "150px" }}
                  onClick={(e) => handleCheckLogin(e, el?.time)}
                >
                  <Typography variant="label3">
                    {times[el?.time - 1].value}
                  </Typography>
                </Button>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography sx={{ alignSelf: "center" }}>
            Không có lịch khám
          </Typography>
        )}

        <Box
          className="calendar"
          sx={{ flexDirection: "row", alignItems: "center", gap: "10px" }}
        >
          <Typography variant="body2">Giá khám: </Typography>
          <Typography variant="body3">
            {" "}
            {schedule?.cost ? `${formatMoney(schedule?.cost)} VNĐ` : "---"}
          </Typography>
        </Box>
      </Box>
      <Popup
        open={openPopUp}
        handleClose={handleCloseConfirmPopUp}
        title={"Bạn có muốn đặt lịch?"}
        message={`Giờ: ${times[time - 1]?.value}`}
        enableCancelButton
        onClick={handleBooking}
      />
      <Popup
        open={openPopUpLogin}
        handleClose={handleCloseConfirmPopUpLogin}
        title={"Đăng nhập trước khi đặt lịch"}
        message={`Bạn có muốn đăng nhập không???`}
        enableCancelButton
        onClick={() => navigate("/login")}
      />
    </Box>
  );
};

export default Doctor;
