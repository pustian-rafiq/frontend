//This piece of code is used to get the current loggedin user which is fetched from cookie.
import cookie from "cookie";

const getCurrentUser = (req, type) => {
  let userInfo = null;

  if (type === "isServerSide") {
    const emServerCookie = cookie.parse((req && req.headers.cookie) || "");

    if (emServerCookie.EMUI) {
      userInfo = emServerCookie.EMUI;
    }

    return userInfo;
  } else if (type === "isInitial") {
    const emInitialCookie = (req.req && req.req.cookies) || "";

    if (emInitialCookie.EMUI) {
      userInfo = emInitialCookie.EMUI;
    }

    return userInfo;
  } else {
    return userInfo;
  }
};

export default getCurrentUser;
