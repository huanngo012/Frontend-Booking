import React, { memo, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Button, Typography, Box } from "@mui/material";

const DetailBooking = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" color="green" onClick={handleClickOpen}>
        <Typography variant="button1"> Chi tiết</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={false}>
        <DialogTitle>Nhận xét của bác sĩ</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              margin: "20px",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                marginX: "28px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {data?.desciption ? (
                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                  className="truncate"
                />
              ) : (
                <Typography>Bác sĩ chưa nhận xét</Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button variant="contained" color="red" onClick={handleClose}>
            <Typography variant="button1">Quay lại</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default memo(DetailBooking);
