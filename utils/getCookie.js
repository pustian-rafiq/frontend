import cookie from "cookie";

const getCookie = (req, type) => {
  let sessionCookie = null;

  if (type === "isServerSide") {
    const emServerCookie = cookie.parse((req && req.headers.cookie) || "");

    if (emServerCookie.EMAccessToken) {
      sessionCookie = emServerCookie.EMAccessToken;
    }

    return sessionCookie;
  } else if (type === "isInitial") {
    const emInitialCookie = (req.req && req.req.cookies) || "";

    if (emInitialCookie.EMAccessToken) {
      sessionCookie = emInitialCookie.EMAccessToken;
    }

    return sessionCookie;
  } else {
    return sessionCookie;
  }
};

export default getCookie;
