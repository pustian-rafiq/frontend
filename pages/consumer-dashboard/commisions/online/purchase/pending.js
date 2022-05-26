import React from "react";
import PendingTable from "../../../../../components/Dashboard/Commisions/OnlineOc/PendingTable";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import withConsumerAuth from "../../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../../utils/getCookie";
import getCurrentUser from "../../../../../utils/getCurrentUser";

const Pending = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}></Grid>
          <Grid item xs={12} md={8}>
            <PendingTable />
          </Grid>
          <Grid item xs={12} md={2}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default withConsumerAuth(Pending);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";

  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));
  if (getSessionCookie === null || !getUser || getUser.isStaff) {
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
