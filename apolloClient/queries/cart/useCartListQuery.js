import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_CART_LIST = gql`
  query {
    me {
      consumers {
        country {
          id
          currenciesName
          currenciesSymbol
          usd1ToLocalCurrency
        }
        carts {
          edges {
            node {
              id
              quantity
              subtotal
              subtotalUsd
              commission
              commissionUsd

              discount
              discountUsd

              offerPrice
              offerPriceUsd
              vatPercentage
              vatAmount
              vatAmountUsd

              extraField

              product {
                id
                name
                quantity
                productImage
                sellPrice
                sellPriceDolar

                productoffer {
                  amount
                  amountUsd
                }
                products {
                  edges {
                    node {
                      id
                      sellPrice
                    }
                  }
                }
                shop {
                  id
                  name
                }
                category {
                  id
                  name
                }
                subcategory {
                  name
                }
                subsubcategory {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

const useCartList = (token) => {
  const { loading, error, data } = useQuery(GET_CART_LIST, {
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "network-only",
  });

  return { cartListLoading: loading, cartListError: error, cartListData: data };
};

export const useCartListOnServerSide = (token) => {
  const cartItems = client.query({
    query: GET_CART_LIST,
    context: {
      headers: {
        Authorization: `JWT ${token}`,
      },
    },
    fetchPolicy: "network-only",
  });

  return {
    cartItems: cartItems,
  };
};

export default useCartList;
