import { Header, Footer, NavBar } from "../components/index";

import { Box, Divider } from "@mui/material";

function DefaultLayout({ children }) {
  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar />
      <Header />
      <Divider />
      {children}

      <Footer />
    </Box>
  );
}

export default DefaultLayout;
