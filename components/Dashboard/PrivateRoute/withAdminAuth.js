//This piece of code is a higher order component and used to authenticate if an user is an admin or not. This component takes a component as input and returns a component as output. If an user is not an admin he/she should be redirected to home page.

//IMPORTANT:: Every pages from admin dashboard must return "token" and "currentUser" form "getServerSideProps" which is used in "withAdminAuth" HOC(Higher order Component)!

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useVarifyTokenMutation from "../../../apolloClient/mutation/token/verifyTokenMutation";

const withAdminAuth = (Component) => {
  const emAdminAuth = (props) => {
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
        if (!props.currentUser.isStaff && pathUrl.includes("admin-dashboard")) {
          router.replace("/");
        }
      } else {
        router.replace("/");
      }
      // }
    }, []);

    // If user is logged in, return original component

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    emAdminAuth.getInitialProps = Component.getInitialProps;
  }

  return emAdminAuth;
};

export default withAdminAuth;
