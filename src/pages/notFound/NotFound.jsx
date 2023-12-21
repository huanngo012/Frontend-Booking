import "./style.scss";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import icons from "../../utils/icons";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container className="notFound-container">
      <Stack spacing="30px" className="notFound-wrapper">
        <Stack>
          <img
            className="image-notfound"
            src={icons.notFound}
            alt="Not Found"
          />
          <Typography variant="h1">Không tim thấy trang</Typography>
        </Stack>
        <Stack className="notFound-content" spacing="32px">
          <Box className="group-btn">
            <Link to="/">
              <Button
                sx={{
                  marginRight: "16px",
                }}
                variant="outlined"
                color="primary"
              >
                Quay lại trang chủ
              </Button>
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
