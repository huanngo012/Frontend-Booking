import { Typography, Box } from "@mui/material";
import Featured from "../Featured/Featured";
import "./style.scss";
import PopularDoctor from "../PopularDoctor/PopularDoctor";
import PopularClinic from "../PopularClinic/PopularClinic";

const Home = () => {
  return (
    <>
      <div className="homeContainer">
        <Featured />
        <Typography variant="h4" className="homeTitle">
          Bác sĩ mới nhất
        </Typography>
        <Box sx={{ padding: "0 var(--padding-x)", width: "100%" }}>
          <PopularDoctor />
        </Box>
        <Typography variant="h4" className="homeTitle">
          Bệnh viện mới nhất
        </Typography>
        <Box sx={{ padding: "0 var(--padding-x)", width: "100%" }}>
          <PopularClinic />
        </Box>
      </div>
    </>
  );
};

export default Home;
