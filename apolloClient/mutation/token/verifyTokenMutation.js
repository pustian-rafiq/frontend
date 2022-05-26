import { gql, useMutation } from "@apollo/client";
import client from "../../configuration/apolloConfig";

export const VERIFY_TOKEN = gql`
  mutation ($token: String!) {
    verifyToken(token: $token) {
      payload
      success
      errors
    }
  }
`;

const useVarifyTokenMutation = (userToken) => {
  const validToken = client.mutate({
    mutation: VERIFY_TOKEN,
    variables: {
      token: userToken,
    },
  });

  return validToken;
};
export default useVarifyTokenMutation;
