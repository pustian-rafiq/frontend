import { gql } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_COMPANIES = gql`
  query {
    companies {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const useCompanies = async () => {
  const companies = await client.query({ query: GET_COMPANIES });

  return companies;
};

export default useCompanies;
