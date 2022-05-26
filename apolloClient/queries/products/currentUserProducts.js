import { gql, useQuery } from "@apollo/client";

// query
export const GET_CURRENT_USER_PRODUCTS = gql`
  query ($first: Int, $after: String, $offset: Int) {
    myProducts(first: $first, after: $after, offset: $offset) {
      edges {
        node {
          id
          name
          productImage
          quantity
          buyPrice
          sellPrice
          company {
            id
            name
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const useCurrentUserProducts = (token, first = 20) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_CURRENT_USER_PRODUCTS,
    {
      variables: { first: first + 1 },
      context: {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    }
  );

  return {
    loading,
    error,
    data,
    fetchMore,
  };
};

export default useCurrentUserProducts;
