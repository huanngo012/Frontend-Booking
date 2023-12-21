import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";
import "./style.scss";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import * as apis from "../../../apis";
import { Popup, SelectDate } from "../../../components";
import { formatMoney } from "../../../utils/helper";
import { times } from "../../../utils/contants";
import { addBooking } from "../../../store/booking/asyncAction";
import useNotification from "../../../hooks/useNotification";
import { useSelector } from "react-redux";
import { resetBookingStatus } from "../../../store/booking/bookingSlice";

const DoctorDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { displayNotification } = useNotification();
  const { loading, errorAction, successAction } = useSelector(
    (state) => state.booking
  );

  const [openPopUp, setOpenPopUp] = useState(false);
  const [doctor, setDoctor] = useState({});
  const [schedule, setSchedule] = useState({});
  const [date, setDate] = useState(new Date().getTime());
  const [time, setTime] = useState("");
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");

  const getApiGetDoctor = async () => {
    const response = await apis.apiGetDoctor(id);
    if (response.success) {
      setDoctor(response?.data);
    }
  };

  const getScheduleByDoctorID = async () => {
    const response = await apis.apiGetAllSchedules({
      doctorID: id,
      date: date,
    });
    if (response?.success) {
      setSchedule(response?.data[0]);
    } else {
      setSchedule({});
    }
  };

  useEffect(() => {
    getApiGetDoctor();
  }, [dispatch]);

  useEffect(() => {
    getScheduleByDoctorID();
  }, [date]);

  const handleComment = () => {};

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
    <Box className="doctorDetail">
      <Box className="doctorInfor">
        <Box className="doctorImgBox">
          <img
            src="https://png.pngtree.com/png-vector/20221006/ourlarge/pngtree-chibi-doctor-kids-cute-boy-png-image_6288993.png"
            className="doctorImg"
            alt=""
          />
        </Box>
        <Box className="doctorDescription">
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">{doctor?._id?.fullName}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: doctor?.description }}
              className="truncate"
            />
          </Box>
        </Box>
      </Box>
      <Box className="doctorSchedule">
        <Box className="schedule">
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
                    onClick={(e) => {
                      handleOpenConfirmPopup(e);
                      setTime(el?.time);
                    }}
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
        </Box>
        <Box className="address">
          <Typography variant="label1" sx={{ marginBottom: "10px" }}>
            {doctor?.clinicID?.name}
          </Typography>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography variant="label2">Địa chỉ khám:</Typography>
            <Typography variant="body2">
              {doctor?.clinicID?.address?.detail
                ? `${doctor?.clinicID?.address?.detail},`
                : ""}{" "}
              {doctor?.clinicID?.address?.ward
                ? `${doctor?.clinicID?.address?.ward},`
                : ""}{" "}
              {doctor?.clinicID?.address?.district
                ? `${doctor?.clinicID?.address?.district},`
                : ""}
              {doctor?.clinicID?.address?.province}
            </Typography>
          </Box>
          <Box sx={{ padding: "10px 0" }} />
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography variant="body1">Giá khám: </Typography>
            <Typography variant="body2">
              {schedule?.cost ? `${formatMoney(schedule?.cost)} VNĐ` : "---"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="right">
        <Typography variant="body2">Bình luận</Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "10px",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <TextField
            type="text"
            // value={comment}
            placeholder="Bình luận"
            // onChange={(e) => setComment(e.target.value)}
            sx={{ width: "100%", flex: "11" }}
          />
          <Button
            className="button"
            variant="contained"
            sx={{ flex: "1", height: "44px" }}
            onClick={() => handleComment()}
          >
            Bình luận
          </Button>
        </Box>
        {/* {doctor?.comments?.map((el, index) => (
          <Comment name="Ngô Công Huân" comment={el} key={index} />
        ))} */}
      </Box>
      <Popup
        open={openPopUp}
        handleClose={handleCloseConfirmPopUp}
        title={"Bạn có muốn đặt lịch?"}
        message={`Giờ: ${times[time - 1]?.value}`}
        enableCancelButton
        onClick={handleBooking}
      />
    </Box>
  );
};

export default DoctorDetail;
