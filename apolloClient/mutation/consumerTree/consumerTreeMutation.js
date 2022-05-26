import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

const CONSUMER_TREE = gql`
  mutation {
    consumerReftree {
      consumerTree
    }
  }
`;

const useConsumerTreeMutation = (token) => {
  const data = client.mutate({
    mutation: CONSUMER_TREE,
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });

  return data;
};

export default useConsumerTreeMutation;
