import { Box } from "@mui/material";
import { useSelector } from "react-redux";
const Helmet = (props) => {
  const { current } = useSelector((state) => state.auth);
  document.title = props.title;
  return <Box>{props.children}</Box>;
};

export default Helmet;
