import React, { memo, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography, Box, Stack } from "@mui/material";
import { CustomSelect, MarkdownEditor } from "../../components";
import { status } from "../../utils/contants";
import { updateBooking } from "../../store/booking/asyncAction";

const DetailBooking = ({ data }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.auth);
  const [payload, setPayload] = useState({});
  const [invalidFields, setInvalidFields] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    setPayload({
      status: data?.status,
      id: data?.id,
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (payload?.status !== "Đã khám") {
      setPayload((prev) => ({ ...prev, description: "" }));
    }
  }, [payload?.status]);

  const handleSubmit = () => {
    const { id, ...data } = payload;

    id &&
      dispatch(
        updateBooking({
          id,
          data,
        })
      );
  };

  return (
    <Box>
      <Button variant="contained" color="green" onClick={handleClickOpen}>
        <Typography variant="button1"> Chi tiết</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={false}>
        {current?.role === 4 ? (
          <>
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
                  {data?.description ? (
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: data?.description }}
                      className="truncate_2"
                    />
                  ) : (
                    <Typography>Bác sĩ chưa nhận xét</Typography>
                  )}
                </Box>
              </Box>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>Nhận xét của bạn</DialogTitle>
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
                  <Stack direction="column" width="100%" spacing="16px">
                    <Stack width="100%" spacing="8px" direction="column">
                      <CustomSelect
                        label="Trạng thái"
                        value={payload.status}
                        setValue={setPayload}
                        nameKey="status"
                        options={status}
                      />
                    </Stack>
                    <Stack width="100%" spacing="8px" direction="row">
                      <MarkdownEditor
                        nameKey="description"
                        label="Nhận xét"
                        setValue={setPayload}
                        value={
                          payload.description === "" || payload.description
                            ? payload.description
                            : data?.description
                        }
                        disabled={payload?.status === "Đã khám" ? false : true}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                      />
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
        <DialogActions sx={{ padding: "16px" }}>
          {current?.role === 3 && (
            <Button variant="contained" color="green" onClick={handleSubmit}>
              <Typography variant="button1"> Cập nhật</Typography>
            </Button>
          )}
          <Button variant="contained" color="red" onClick={handleClose}>
            <Typography variant="button1">Quay lại</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default memo(DetailBooking);
