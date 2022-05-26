import React from "react";
import ShowConsumerTree from "../../../components/Dashboard/ConsumerTree/ShowConsumerTree";
import useConsumerTreeMutation from "../../../apolloClient/mutation/consumerTree/consumerTreeMutation";
import withConsumerAuth from "../../../components/Dashboard/PrivateRoute/withConsumerAuth";
import getCookie from "../../../utils/getCookie";
import getCurrentUser from "../../../utils/getCurrentUser";

const ConsumerTree = ({ data, error }) => {
  return (
    <>
      <ShowConsumerTree data={data} />
    </>
  );
};

export default withConsumerAuth(ConsumerTree);

export const getServerSideProps = async ({ req }) => {
  const isServerSide = "isServerSide";
  const getSessionCookie = getCookie(req, isServerSide);
  const getUser = JSON.parse(getCurrentUser(req, isServerSide));

  const data = await useConsumerTreeMutation(getSessionCookie);

  if (getSessionCookie === null || !getUser || getUser.isStaff) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (data.data.consumerReftree.consumerTree) {
    return {
      props: {
        data:
          data.data.consumerReftree && data.data.consumerReftree.consumerTree,
        error: false,
        token: getSessionCookie,
        currentUser: getUser,
      },
    };
  }

  return {
    props: {
      data: {},
      error: true,
      token: getSessionCookie,
      currentUser: getUser,
    },
  };
};
