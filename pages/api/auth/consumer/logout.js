import cookie from "cookie";

const logoutHandler = async (req, res) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("EMAccessToken", "", {
        httpOnly: true,
        //   secure: process.env.NODE_ENV !== "development",
        maxAge: -1,
        sameSite: "strict",
        path: "/",
      }),
      cookie.serialize("EMRefreshToken", "", {
        httpOnly: true,
        //   secure: process.env.NODE_ENV !== "development",
        maxAge: -1,
        sameSite: "strict",
        path: "/",
      }),
      cookie.serialize("EMUI", "", {
        httpOnly: true,
        //   secure: process.env.NODE_ENV !== "development",
        maxAge: -1,
        sameSite: "strict",
        path: "/",
      }),
    ]);

    return res.status(200).end();
  } else {
    return res.writeHead(302, { Location: "/" }).end();
  }
};

export default logoutHandler;
