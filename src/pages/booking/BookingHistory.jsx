import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { cancelBooking, getBookings } from "../../store/booking/asyncAction";
import {
  CustomSkeleton,
  EmptyPage,
  Helmet,
  Popup,
} from "../../components/index";
import {
  bookingColumns,
  bookingDoctorColumns,
} from "../../utils/datatablesource";
import { times } from "../../utils/contants";
import useNotification from "../../hooks/useNotification";
import { Typography, Box, Button, Grid } from "@mui/material";
import { resetBookingStatus } from "../../store/booking/bookingSlice";
import DetailBooking from "./DetailBooking";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, totalItem, errorAction, successAction, loading } =
    useSelector((state) => state.booking);
  const { current } = useSelector((state) => state.auth);

  const { displayNotification } = useNotification();

  const [rows, setRows] = useState([]);
  const [id, setId] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    dispatch(getBookings());
  }, [successAction]);
  useEffect(() => {
    const newBookings =
      bookings &&
      bookings?.map((el, index) => {
        return {
          id: el._id,
          idRow: index + 1,
          namePatient: el?.patientID?.fullName,
          gender: el?.patientID?.gender,
          nameClinic: el?.scheduleID?.doctorID?.clinicID?.name,
          addressClinic: el?.scheduleID?.doctorID?.clinicID?.address,
          nameSpecialty: el?.scheduleID?.doctorID?.specialtyID?.name,
          nameDoctor: el?.scheduleID?.doctorID?._id?.fullName,
          status: el?.status,
          date: moment(el?.scheduleID.date).format("DD/MM/yyyy"),
          description: el?.description,
          time: times[el?.time - 1].value,
          images: el?.images,
          isPaid: el?.isPaid,
        };
      });
    newBookings.sort((a, b) => {
      const dateA = moment(a.date, "DD/MM/yyyy");
      const dateB = moment(b.date, "DD/MM/yyyy");
      return dateB - dateA;
    });

    setRows(newBookings);
  }, [totalItem, bookings]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 300,
      align: "center",
      renderHeader(params) {
        let headerName = params.colDef.headerName;
        return (
          <Typography variant="label3" color="var(--text-primary)">
            {headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {params.row?.status !== "Đã hủy" && (
              <>
                <DetailBooking data={params.row} />
                <Button
                  variant="contained"
                  color="red"
                  onClick={(e) => {
                    handleOpenConfirmPopup(e);
                    setId(params.row.id);
                    setTime(params.row.time);
                  }}
                >
                  <Typography variant="button1">Hủy</Typography>
                </Button>
                <Button
                  variant="contained"
                  disabled={params?.row?.isPaid === false ? false : true}
                >
                  <Typography variant="button1">
                    {params?.row?.isPaid === false
                      ? "Thanh toán"
                      : "Đã thanh toán"}
                  </Typography>
                </Button>
              </>
            )}
          </Box>
        );
      },
    },
  ];
  const actionDoctorColumn = [
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      width: 300,
      align: "center",
      renderHeader(params) {
        let headerName = params.colDef.headerName;
        return (
          <Typography variant="label3" color="var(--text-primary)">
            {headerName}
          </Typography>
        );
      },
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {params.row?.status !== "Đã hủy" && (
              <>
                <DetailBooking data={params.row} />
                <Button
                  variant="contained"
                  color="red"
                  onClick={(e) => {
                    handleOpenConfirmPopup(e);
                    setId(params.row.id);
                    setTime(params.row.time);
                  }}
                >
                  <Typography variant="button1">Hủy</Typography>
                </Button>
              </>
            )}
          </Box>
        );
      },
    },
  ];

  const [openPopUp, setOpenPopUp] = useState(false);

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
  const handleDeleteSchedule = () => {
    id && dispatch(cancelBooking(id));
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
    <Helmet title="Lịch sử">
      {current ? (
        <Grid container sx={{ padding: "0px 32px" }}>
          <Box
            className="card-data-header"
            sx={{
              width: "100%",
              flexDirection: "row",
              border: "var(--border-color)",
              padding: "24px 0",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h5">Danh sách lịch khám bệnh</Typography>
            </Box>
          </Box>
          <Box sx={{ height: "100%", width: "100%" }}>
            {loading ? (
              <CustomSkeleton
                customKey={`skeleton__card-notify`}
                variant="card-notify"
              />
            ) : (
              <DataGrid
                slots={
                  rows?.length === 0
                    ? {
                        columnHeaders: () => null,
                        noRowsOverlay: () => (
                          <EmptyPage
                            title="Không tìm thấy lịch khám"
                            message="Vui lòng đặt lịch khám"
                          />
                        ),
                      }
                    : {}
                }
                columns={
                  current?.role === 4
                    ? bookingColumns.concat(actionColumn)
                    : bookingDoctorColumns.concat(actionDoctorColumn)
                }
                rows={rows}
                pagination={rows?.length > 0 ? true : false}
                totalRow={totalItem}
                height={185}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            )}
          </Box>
        </Grid>
      ) : (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          marginTop="50px"
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/login`);
            }}
          >
            Đăng nhập
          </Button>
        </Box>
      )}
      <Popup
        open={openPopUp}
        handleClose={handleCloseConfirmPopUp}
        title="Bạn có muốn hủy lịch khám này?"
        message={`Giờ: ${time}`}
        enableCancelButton
        onClick={handleDeleteSchedule}
      />
    </Helmet>
  );
};

export default BookingHistory;
