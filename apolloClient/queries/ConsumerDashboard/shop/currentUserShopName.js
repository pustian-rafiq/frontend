import { gql } from "@apollo/client";
import client from "../../../configuration/apolloConfig";

// query
export const GET_CURRENT_USER_SHOP_NAME = gql`
  query {
    me {
      consumers {
        username
        shops {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

const useCurrentUserShopName = async (token) => {
  const shopName = await client.query({
    query: GET_CURRENT_USER_SHOP_NAME,
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });

  return shopName;
};

export default useCurrentUserShopName;
