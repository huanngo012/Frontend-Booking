import React, {useState} from 'react'
import './style.scss'
import { Box, Typography, Button, Divider } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { SelectDate } from "../../components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


const ClinicDetail = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date().getTime());
    return (
        <Box className="clinic">
            <Box className='clinic-image-box'>
                <img 
                    alt="Phòng khám Đa khoa Victoria Healthcare Quận 7" 
                    className='clinic-image'
                    sizes="100vw" 
                    srcset="https://cdn.bookingcare.vn/fo/w640/2023/05/18/134213-nguyen-van-linh-q7.jpg 640w, https://cdn.bookingcare.vn/fo/w750/2023/05/18/134213-nguyen-van-linh-q7.jpg 750w, https://cdn.bookingcare.vn/fo/w828/2023/05/18/134213-nguyen-van-linh-q7.jpg 828w, https://cdn.bookingcare.vn/fo/w1080/2023/05/18/134213-nguyen-van-linh-q7.jpg 1080w, https://cdn.bookingcare.vn/fo/w1200/2023/05/18/134213-nguyen-van-linh-q7.jpg 1200w, https://cdn.bookingcare.vn/fo/w1920/2023/05/18/134213-nguyen-van-linh-q7.jpg 1920w, https://cdn.bookingcare.vn/fo/2023/05/18/134213-nguyen-van-linh-q7.jpg 2048w, https://cdn.bookingcare.vn/fo/2023/05/18/134213-nguyen-van-linh-q7.jpg 3840w" 
                    src="https://cdn.bookingcare.vn/fo/2023/05/18/134213-nguyen-van-linh-q7.jpg"
                />
                <Box className="additional-box">
                    <Box sx={{width:'50%', boxShadow:'10%'}}></Box>
                </Box>
                <Box className="card-bio">
                    <Box className='desc-clinic-1'>
                        <Typography>
                            BookingApp là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </Typography>
                    </Box>
                    <Box className='desc-clinic-2'>
                        <div>
                            <Typography variant='body2'>
                                Hãy đặt khám với Phòng khám Đa khoa Victoria Healthcare Quận 7 trên Nền tảng Y tế Chăm sóc sức khỏe toàn diện BookingCare:
                            </Typography>
                            <ul>
                                <li>Được lựa chọn khám với các bác sĩ chuyên khoa giàu kinh nghiệm, dịch vụ y tế chất lượng</li>
                                <li>Đặt hẹn trực tuyến &amp; nhận hướng dẫn chi tiết trước khi đi khám&nbsp;(miễn phí)</li>
                                <li>Giảm thiểu thời gian chờ đợi</li>
                            </ul>
                        </div>
                    </Box>
                </Box>
            </Box>
            <Box className='clinic-body-box'>
                <Box className='clinic-box-header'>
                    <Typography variant='h5'>Bác sĩ</Typography>    
                </Box>
                <Divider/>
                <Box className='clinic-box-body'>
                    <Box className='doctor-clinic-detail'>
                        <Box className='doctor-clinic-detail-1'>
                            <Box className="doctorImgBox">
                                <img
                                    src="https://png.pngtree.com/png-vector/20221006/ourlarge/pngtree-chibi-doctor-kids-cute-boy-png-image_6288993.png"
                                    className="doctorImg"
                                    alt=""
                                />
                            </Box>
                            <Box className="">
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h5">Thạc sĩ, Bác sĩ Lê Hồ Xuân Duy</Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        variant="body2"
                                        className="truncate"
                                    >
                                        Hơn 10 năm kinh nghiệm lĩnh vực Tai mũi họng<br/> 
                                        Từng công tác tại Bệnh viện Trưng Vương, Bệnh viện Nhi đồng I
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='doctor-clinic-detail-2'>
                            <Box className="datePicker">
                                <SelectDate
                                label="Chọn ngày:"
                                value={date}
                                setValue={setDate}
                                nameKey="date"
                                />
                            </Box>
                            <Box className="calendar">
                                <CalendarMonthIcon />
                                <Typography variant="body2">Lịch khám</Typography>
                            </Box>
                            <Box sx={{ 
                                display:'flex', 
                                width: "33,333%", 
                                padding: "10px", 
                                flexDirection:'column' 
                            }}>
                                <Button
                                    variant={"outlined"}
                                    sx={{ width: "150px"}}
                                >
                                    <Typography variant="label3">
                                        10:00 - 11:00
                                    </Typography>
                                </Button>
                                <Button
                                    variant={"outlined"}
                                    sx={{ width: "150px", marginTop:'10px'  }}
                                >
                                    <Typography variant="label3">
                                        10:00 - 11:00
                                    </Typography>
                                </Button>
                            </Box>
                            <Box className="calendar" sx={{flexDirection:'column', alignItems:'flex-start'}}>
                                <Typography variant="body2">Địa chỉ khám</Typography>
                                <Typography variant='body3'>
                                    Phòng khám Đa khoa Victoria Healthcare Quận 7 <br/>
                                    1056 Nguyễn Văn Linh, Sky Garden 1, Phú Mỹ Hưng, Quận 7, TP. HCM
                            </Typography>
                            </Box>
                            <Divider sx={{marginTop:'10px', marginBottom:'10px'}}/>
                            <Box className="calendar" sx={{flexDirection:'column', alignItems:'flex-start'}}>
                                <Typography variant="body2">Giá khám</Typography>
                                <Typography variant='body3'>
                                    150000
                                </Typography>
                            </Box>
                        </Box>
                    </Box>   
                </Box>
            </Box>
        </Box>
    )
}

export default ClinicDetail