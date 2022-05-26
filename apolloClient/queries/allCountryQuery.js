import { gql, useQuery } from "@apollo/client";
import client from "../configuration/apolloConfig";

// query
export const GET_COUNTRIES = gql`
  query {
    countries {
      edges {
        node {
          id
          callingCodes
          name
        }
      }
    }
  }
`;

const useCountry = async () => {
  const { data: countries } = await client.query({ query: GET_COUNTRIES });
  return { countries };
};

export default useCountry;
