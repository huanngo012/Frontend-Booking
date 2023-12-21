import { Header, Footer, NavBar } from "../components/index";
import { Divider } from "@mui/material";

function DefaultLayout({ children }) {
  return (
    <>
      <NavBar />
      <Header />
      <Divider />
      {children}

      <Footer />
    </>
  );
}

export default DefaultLayout;
