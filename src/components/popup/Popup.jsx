import React from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import "./style.scss";
import icons from "../../utils/icons";

const PopUp = (props) => {
  const {
    open,
    handleClose,
    title,
    message,
    enableCancelButton,
    onClick,
    loading,
  } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box className="popup-box">
        <Box className="popup-box-header">
          <Box className="popup-box-inner">
            <Box
              component="img"
              src="https://png.pngtree.com/png-vector/20221006/ourlarge/pngtree-chibi-doctor-kids-cute-boy-png-image_6288993.png"
              alt="error-rounded"
              sx={{ height: "64px", width: "64px" }}
            />
            <Box className="popup-box-content">
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" sx={{ color: "var(--blue-100)" }}>
                {message}
              </Typography>
            </Box>
          </Box>
          <Box
            component="img"
            className="popup-cancel-icon"
            src={icons.cancelIcon}
            alt="cancel"
            onClick={() => !loading && handleClose()}
            sx={{ cursor: `${loading ? "default" : "pointer"}` }}
          />
        </Box>
        <Box className="popup-action">
          {enableCancelButton && (
            <Button
              disabled={loading}
              variant="contained"
              color="tertiary"
              disableElevation
              className="popup-cancel-button"
              onClick={() => !loading && handleClose()}
            >
              <Typography variant="button1">Hủy</Typography>
            </Button>
          )}
          <Button
            disabled={loading}
            variant="contained"
            disableElevation
            className="popup-confirm-button"
            onClick={onClick}
          >
            {loading ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={28} sx={{ color: "white" }} />
              </Box>
            ) : (
              <Typography variant="button1">Xác nhận</Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopUp;
