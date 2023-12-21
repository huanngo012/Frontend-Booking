import { Typography, Box } from "@mui/material";
import "./style.scss";
import Slider from "react-slick";
import { useEffect } from "react";
import { getDoctors } from "../../../store/doctors/asyncAction";
import { useSelector, useDispatch } from "react-redux";
import { renderStartFromNumber } from "../../../utils/helper";
import { Link } from "react-router-dom";
import icons from "../../../utils/icons";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const PopularDoctor = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctor);

  const getApiDoctors = async () => {
    dispatch(getDoctors({ limit: 5, page: 1 }));
  };
  useEffect(() => {
    getApiDoctors();
  }, []);

  return (
    <Slider className="custom-slider" {...settings}>
      {doctors?.length > 0 &&
        doctors?.map((el, index) => (
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
              to={`/doctor-detail/${el?._id?._id}`}
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
                  src={
                    el?._id?.avatar
                      ? el?._id?.avatar
                      : "https://res.cloudinary.com/dc4o6u6wm/image/upload/v1695879909/booking/ofq3mmhglsyt51h8xale.png"
                  }
                  alt="Ảnh"
                  style={{
                    width: "200px",
                    borderRadius: "10px",
                    height: "200px",
                    objectFit: "cover",
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
                <Typography variant="body1" color="black" className="truncate">
                  {el?.clinicID?.name} - {el?.specialtyID?.name}
                </Typography>
                <Typography variant="label1" color="black" className="truncate">
                  {el?._id?.fullName}
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

export default PopularDoctor;
