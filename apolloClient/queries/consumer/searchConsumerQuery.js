import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_SEARCH_CONSUMERS = gql`
  query ($search: String!) {
    searchConsumer(search: $search) {
      edges {
        node {
          id
          leftRefer
          rightRefer
          referedBy
          password
          phone
          gender
          username
          user {
            id
            firstName
            lastName
            email
          }
          callingCode
          createdAt
          bKashAcc
          photo

          consumeraddresses {
            continent {
              id
              name
            }
            country {
              id
              name
              currenciesSymbol
              localOneCurrencyToUsd
              usd1ToLocalCurrency
            }
            divisionOrState {
              id
              name
            }
            districtOrCity {
              id
              name
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
        hasPreviousPage
      }
    }
  }
`;
//export default GET_CONSUMERS

const useSearchConsumers = (searchText) => {
  // const { loading, error, data, fetchMore } = useQuery(GET_SEARCH_CONSUMERS, {
  //   variables: { search: searchText },
  // });
  // return { loading, data, error, fetchMore };
  const searchData = client.query({
    query: GET_SEARCH_CONSUMERS,
    variables: { search: searchText },
  });
  return searchData;
};

export default useSearchConsumers;
