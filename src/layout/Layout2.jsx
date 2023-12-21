import { Footer, NavBar } from "../components/index";
import { Divider, Box } from "@mui/material";

function Layout2({ children }) {
  return (
    <Box sx={{ height: "100vh" }}>
      <NavBar />
      <Divider />
      {children}

      <Footer />
    </Box>
  );
}

export default Layout2;
