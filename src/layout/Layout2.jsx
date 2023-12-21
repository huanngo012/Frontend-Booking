import { Header, Footer, NavBar } from "../components/index";
import { Divider } from "@mui/material";

function Layout2({ children }) {
  return (
    <>
      <NavBar />
      <Divider />
      {children}

      <Footer />
    </>
  );
}

export default Layout2;
