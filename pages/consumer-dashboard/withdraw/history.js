import React from "react";
import withConsumerAuth from "../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import TransactionHistory from "../../../components/Dashboard/Withdraw/TransactionHistory";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";
const History = () => {
  return (
    <>
      <TransactionHistory />
    </>
  );
};

export default withConsumerAuth(History);

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
