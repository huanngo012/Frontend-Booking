import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import * as apis from "../../apis";
import { Box, Divider } from "@mui/material";

const ChatbotCustom = () => {
  const [clinics, setClinics] = useState([]);
  const fetchClinic = async () => {
    const response = await apis.apiGetAllClinics();
    if (response?.success) {
      // setClinics(response?.data);
      const a = response?.data?.map((el) => {
        return { value: el?._id, label: el?.name, trigger: "5" };
      });
      setClinics(a);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, []);
  // useEffect(() => {
  //   const a = clinics?.map((el) => {
  //     return { value: el?._id, label: el?.name, trigger: "5" };
  //   });
  // }, [clinics]);

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={[
          {
            id: "1",
            message: "Bạn cần hỗ trợ gì?",
            trigger: "2",
          },
          {
            id: "2",
            options: [
              { value: 1, label: "Giới thiệu", trigger: "3" },
              { value: 2, label: "Danh sách bệnh viện", trigger: "4" },
              { value: 3, label: "Đặt lịch", trigger: "clinicID" },
            ],
          },
          {
            id: "3",
            message: "Đây là 1 trang web để mọi người có thể đặt lịch.",
            trigger: "2",
          },
          {
            id: "4",
            component: <ListClinic />,
            asMessage: true,
            trigger: "2",
          },
          {
            id: "clinicID",
            options: clinics,
          },
          {
            id: "5",
            message: "Great! Check out your summary",
            trigger: "1",
          },
        ]}
        floating={true}
      />
    </ThemeProvider>
  );
};

export default ChatbotCustom;

const theme = {
  background: "var(--white)",
  fontFamily: "BeVietNamPro",
  headerBgColor: "var(--primary)",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "var(--primary)",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const ListClinic = () => {
  const [clinics, setClinics] = useState([]);
  const fetchClinic = async () => {
    const response = await apis.apiGetAllClinics();
    if (response?.success) {
      setClinics(response?.data);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, []);
  return (
    <Box style={{ width: "100%" }}>
      <h3>Danh sách bệnh viện</h3>
      {clinics?.map((el, index) => (
        <>
          <Box>{el?.name}</Box>
          <Divider sx={{ margin: "10px 0" }} />
        </>
      ))}
    </Box>
  );
};
