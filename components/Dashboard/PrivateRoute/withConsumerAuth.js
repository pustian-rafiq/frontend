//This piece of code is a higher order component and used to authenticate if an user is a consumer or not. This component takes a component as input and returns a component as output. If an user is not a consumer he/she should be redirected to home page.

//IMPORTANT:: Every pages from consumer dashboard must return "token" and "currentUser" form "getServerSideProps" which is used in "withConsumerAuth" HOC(Higher order Component)!

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useVarifyTokenMutation from "../../../apolloClient/mutation/token/verifyTokenMutation";

const withConsumerAuth = (Component) => {
  const emConsumerAuth = (props) => {
    const router = useRouter();
    const pathUrl = router.pathname;

    useEffect(() => {
      useVarifyTokenMutation(props.token).then((res) => {
        if (!res.data.verifyToken.success) {
          const res = axios.post("/api/auth/consumer/logout"); //if cookies are modified or edited then the user should be logged out and he/she will be redirected to home page.
          router.push("/");
        }
      });
      if (props.currentUser) {
        if (
          props.currentUser?.isStaff &&
          pathUrl.includes("consumer-dashboard")
        ) {
          router.replace("/");
        }
      } else {
        router.replace("/");
      }
    }, []);

    // If user is logged in, return original component

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    emConsumerAuth.getInitialProps = Component.getInitialProps;
  }

  return emConsumerAuth;
};

export default withConsumerAuth;
