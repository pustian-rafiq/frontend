import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_GALLARY = gql`
  query {
    me {
      consumers {
        country {
          historicalsliders {
            edges {
              node {
                id
                title
                image
                youtubeLink
                isActive
              }
            }
          }
        }
      }
    }
  }
`;

const useHistoryGallary = (token) => {
  const { loading, error, data } = useQuery(GET_GALLARY, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "network-only",
  });

  return { loading, error, data };
};

export default useHistoryGallary;
