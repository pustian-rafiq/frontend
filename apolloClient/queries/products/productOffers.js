import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_PRODUCT_OFFERS = gql`
  query {
    me {
      consumers {
        productoffers {
          edges {
            node {
              id
              amount
              amountUsd
              conditionAmount
              name
              description
            }
          }
        }
      }
    }
  }
`;

const useProductOffers = async (token) => {
  const productOffers = await client.query({
    query: GET_PRODUCT_OFFERS,
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });

  return productOffers;
};

export default useProductOffers;
