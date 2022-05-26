import cookie from "cookie";
import useVarifyTokenMutation from "../../../../apolloClient/mutation/token/verifyTokenMutation";

const consumerCookieHandler = async (req, res) => {
  const emServerCookie = cookie.parse((req && req.headers.cookie) || "");

  if (emServerCookie.EMRefreshToken) {
    const emvalidToken = await useVarifyTokenMutation(
      emServerCookie.EMAccessToken
    );

    if (
      emvalidToken.data.verifyToken.payload !== null &&
      emvalidToken.data.verifyToken.success
    ) {
      return res.end(
        JSON.stringify({
          ...emServerCookie,
          EMAccessToken: emServerCookie.EMAccessToken,
          EMUI: JSON.stringify(emServerCookie.EMUI),
        })
      );
    } else {
      return res.end(
        JSON.stringify({ ...emServerCookie, EMAccessToken: null, EMUI: null })
      );
    }
  }

  return res.end(JSON.stringify(emServerCookie));
};

export default consumerCookieHandler;
