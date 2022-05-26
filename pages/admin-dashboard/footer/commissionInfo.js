import { Box, Button, InputLabel, Paper, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import withAdminAuth from "../../../components/Dashboard/PrivateRoute/withAdminAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
const CKEditor = dynamic(
  import("../../../components/Dashboard/AdminDashboard/CkEditor/CkEditor.js"),
  {
    ssr: false,
  }
);

const commissionInfo = ({ token, currentUser }) => {
  const [ckData, setCkData] = useState("");
  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        sx={{
          color: "#6c757d",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: 400,
        }}
      >
        Commission Info
      </Typography>
      <Box sx={{ m: 3 }}>
        <InputLabel sx={{ fontSize: "14px", color: "#34395e" }}>
          Description of Commission Info
        </InputLabel>
        <CKEditor ckData={ckData} setCkData={setCkData} />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained">Save</Button>
      </Box>
    </Paper>
  );
};

export default withAdminAuth(commissionInfo);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  if (getSessionCookie === null || !getUser || !getUser.isStaff) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
