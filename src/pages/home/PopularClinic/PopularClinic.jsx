import "./style.scss";
import { Typography, Box } from "@mui/material";
import Slider from "react-slick";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { renderStartFromNumber } from "../../../utils/helper";
import { Link } from "react-router-dom";
import icons from "../../../utils/icons";
import { getClinics } from "../../../store/clinics/asyncAction";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const PopularClinic = () => {
  const dispatch = useDispatch();
  const { clinics } = useSelector((state) => state.clinic);

  const getApiClinics = async () => {
    dispatch(getClinics({ limit: 5, page: 1 }));
  };
  useEffect(() => {
    getApiClinics();
  }, []);

  return (
    <Slider className="custom-slider" {...settings}>
      {clinics?.length > 0 &&
        clinics?.map((el, index) => (
          <Box
            key={index}
            sx={{
              with: "100%",
              padding: "0 8px",
              display: "flex",
              gap: "16px",
            }}
          >
            <Link
              to={`/clinic-detail/${el?._id}`}
              style={{
                width: "100%",
                borderWidth: "1px",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={el?.image || icons.hospitalImage}
                  alt="Ảnh"
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "10px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  marginTop: "16px",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Typography variant="label1" color="black" className="truncate">
                  {el?.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="black"
                  className="truncate_2"
                  sx={{ height: "56px" }}
                >
                  {el?.address?.detail ? `${el?.address?.detail},` : ""}{" "}
                  {el?.address?.ward ? `${el?.address?.ward},` : ""}{" "}
                  {el?.address?.district ? `${el?.address?.district},` : ""}
                  {el?.address?.province}
                </Typography>
                <Box component="span" sx={{ display: "flex", height: "16px" }}>
                  {renderStartFromNumber(el?.totalRatings, 16)?.map(
                    (el, index) => (
                      <Box key={index}>{el}</Box>
                    )
                  )}
                </Box>
              </Box>
            </Link>
          </Box>
        ))}
    </Slider>
  );
};

export default PopularClinic;
