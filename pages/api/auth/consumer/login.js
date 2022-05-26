import cookie from "cookie";
import useConsumerLoginMutation from "../../../../apolloClient/mutation/auth/consumer/loginMutation";

const loginHandler = async (req, res) => {
  if (req.method === "POST") {
    const data = useConsumerLoginMutation(req.body);

    data
      .then((resData) => {
        if (resData.data.tokenAuth.errors == null) {
          res.setHeader("Set-Cookie", [
            cookie.serialize("EMAccessToken", resData.data.tokenAuth.token, {
              httpOnly: true,
              secure: true,
              maxAge: 60 * 60 * 24 * 7,
              sameSite: "strict",
              path: "/",
            }),
            cookie.serialize(
              "EMRefreshToken",
              resData.data.tokenAuth.refreshToken,
              {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "strict",
                path: "/",
              }
            ),
            cookie.serialize(
              "EMUI",
              JSON.stringify(resData.data.tokenAuth.user),
              // resData.data.tokenAuth.user,
              {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "strict",
                path: "/",
              }
            ),
          ]);
        }

        return res.end(JSON.stringify(resData));
      })
      .catch((err) => {
        return res.json({
          error: "Authentication failed",
        });
      });
  } else {
    return res.writeHead(302, { Location: "/login" }).end();
  }
};

export default loginHandler;
