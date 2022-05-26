import { gql, useQuery } from "@apollo/client";
import client from "../../../configuration/apolloConfig";

// query
export const GET_CURRENT_USER_WAREHOUSE = gql`
  query {
    me {
      consumers {
        warehouses {
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

const useCurrentUserWarehouse = async (token) => {
  const { data: warehouse } = await client.query({
    query: GET_CURRENT_USER_WAREHOUSE,
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
  });

  //   const { data, loading, error } = useQuery(GET_CURRENT_USER_WAREHOUSE, {
  //     context: {
  //       headers: {
  //         Authorization: `JWT ${token}`,
  //       },
  //     },
  //   });

  return {
    warehouse,
  };
};

export default useCurrentUserWarehouse;
