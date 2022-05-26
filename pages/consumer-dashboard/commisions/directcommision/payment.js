import React from "react";
import Divider from "@mui/material/Divider";
import DueCommision from "../../../../components/Dashboard/Commisions/DirectGiveCommison/DueCommision";
import PendingPayment from "../../../../components/Dashboard/Commisions/DirectGiveCommison/PendingPayment";
import withConsumerAuth from "../../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../../utils/getCookie";
import getCurrentUser from "../../../../utils/getCurrentUser";
import { useQuery } from "@apollo/client";
import { GET_DIRECT_COMMISION } from "../../../../apolloClient/queries/commision/GetDirectCommision";
import useDirectCommissionGroups from "../../../../apolloClient/queries/commision/dCGroups";
import { Box, Typography } from "@mui/material";

const Payment = ({ token }) => {
  const { dcGroupsData, dcGroupsLoading, dcGroupsError } =
    useDirectCommissionGroups(token);

  const { data, error, loading, fetchMore } = useQuery(GET_DIRECT_COMMISION, {
    variables: { before: null, last: 16 },
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <div>Loading.....</div>;
  }
  return (
    <>
      <div>
        <div className="paymentTitle">
          <span>My Due Commissions</span>
        </div>
        <Divider sx={{ mb: 2 }} />
        <DueCommision dueCommision={data} token={token} />
      </div>

      <Box sx={{ mt: 5 }}>
        <div className="paymentTitle">
          <span>Pending Payment</span>
        </div>
        <Divider sx={{ mb: 1 }} />
        <PendingPayment directCommissionGroups={dcGroupsData} />
      </Box>
    </>
  );
};

export default withConsumerAuth(Payment);

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
