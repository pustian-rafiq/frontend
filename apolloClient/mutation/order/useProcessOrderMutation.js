import { gql, useMutation } from "@apollo/client";
import { GET_CART_LIST } from "../../queries/cart/useCartListQuery";

const PROCESS_ORDER = gql`
  mutation processOrderMutation($listCart: [GenericScalar]) {
    cartMutation(input: { listCart: $listCart }) {
      carts {
        id
        consumer {
          username
        }
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
          productImage
        }
      }
    }
  }
`;

const useProcessOrderMutation = (token) => {
  const [processOrderMutationHandler, { data, loading, error }] = useMutation(
    PROCESS_ORDER,
    {
      refetchQueries: [
        {
          query: GET_CART_LIST,
          context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
        },
      ],
    }
  );

  return {
    processOrderMutationHandler,
    processOrderData: data,
  };
};

export default useProcessOrderMutation;
