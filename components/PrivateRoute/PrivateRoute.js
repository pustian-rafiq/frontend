import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import FullPageLoader from "../PageLoader/FullPageLoader";
import { GlobalContext } from "../../pages/_app";

const PrivateRoute = ({ privateRoutes, children }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  const privateRoute = privateRoutes.indexOf(router.pathname) !== -1;
  const globalData = useContext(GlobalContext);

  useEffect(() => {
    if (privateRoute && globalData.token == null) {
      router.push("/");
    } else if (
      !privateRoute &&
      globalData.token !== null &&
      (router.pathname == "/login" || router.pathname == "/register")
    ) {
      router.push("/");
    }
  }, [globalData.token, privateRoute, pageLoading]);

  if (pageLoading && privateRoute && globalData.token == null) {
    return <FullPageLoader />;
  } else if (
    pageLoading &&
    !privateRoute &&
    globalData.token !== null &&
    (router.pathname == "/login" || router.pathname == "/register")
  ) {
    return <FullPageLoader />;
  }

  return children;
};

export default PrivateRoute;
