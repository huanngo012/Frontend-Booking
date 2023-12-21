import { Typography, Box } from "@mui/material";

export const bookingColumns = [
  {
    field: "idRow",
    headerName: "ID",
    width: 70,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      let headerName = params.colDef.headerName;

      return (
        <Typography variant="label2" color="var(--black)">
          {headerName}
        </Typography>
      );
    },
  },
  {
    field: "nameClinic",
    headerName: "Tên bệnh viện",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      let headerName = params.colDef.headerName;

      return (
        <Typography variant="label2" color="var(--black)">
          {headerName}
        </Typography>
      );
    },
  },
  {
    field: "nameSpecialty",
    headerName: "Tên chuyên khoa",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label2" color="var(--black)">
          {headerName}
        </Typography>
      );
    },
  },
  {
    field: "nameDoctor",
    headerName: "Tên bác sĩ",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      let headerName = params.colDef.headerName;

      return (
        <Typography variant="label2" color="var(--black)">
          {headerName}
        </Typography>
      );
    },
  },
  {
    field: "date",
    headerName: "Ngày khám",
    width: 150,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label2" color="var(--black)">
          {headerName}
        </Typography>
      );
    },
  },

  {
    field: "time",
    headerName: "Giờ khám",
    width: 150,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label2" color="var(--black)">
          {headerName}
        </Typography>
      );
    },
    renderCell: (params) => {
      return (
        <div className="flex items-center justify-center">
          <span
            className={`border border-solid border-black py-2 px-4 cursor-pointer rounded-md bg-orange-500
            `}
          >
            {params.row.time}
          </span>
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 150,
    headerAlign: "center",
    align: "center",
    renderHeader(params) {
      let headerName = params.colDef.headerName;
      return (
        <Typography variant="label2" color="var(--black)">
          {headerName}
        </Typography>
      );
    },
    renderCell: (params) => {
      const text = params.value;
      return (
        <Box
          sx={{
            borderRadius: "6px",
            padding: "6px",
            backgroundColor: `${
              text === "Đã hủy"
                ? "var(--red-100)"
                : text === "Đang xử lý"
                ? "var(--yellow-100)"
                : text === "Đã xác nhận"
                ? "var(--blue-100)"
                : text === "Bỏ khảm"
                ? "var(--grey-primary-100)"
                : "var(--green-100)"
            }`,
            color: `${
              text === "Đã hủy"
                ? "var(--red-900)"
                : text === "Đang xử lý"
                ? "var(--yellow-900)"
                : text === "Đã xác nhận"
                ? "var(--blue-900)"
                : text === "Bỏ khảm"
                ? "var(--grey-primary-900)"
                : "var(--green-900)"
            }`,
          }}
        >
          {params.row.status}
        </Box>
      );
    },
  },
];
