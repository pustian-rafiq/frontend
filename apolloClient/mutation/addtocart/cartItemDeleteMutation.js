import { gql, useMutation } from "@apollo/client";
import { GET_CART_LIST } from "../../queries/cart/useCartListQuery";

export const DELETE_CART_ITEM = gql`
  mutation CartItemDelete($id: ID!) {
    cartDelete(id: $id) {
      message
    }
  }
`;

const useDeleteCartItemMutation = (token) => {
  const [deleteCartItemMutationHandler, { data, loading, error }] = useMutation(
    DELETE_CART_ITEM,
    {
      refetchQueries: [
        {
          query: GET_CART_LIST,
          context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
          fetchPolicy: "network-only",
        },
      ],
    }
  );

  return {
    deleteCartItemMutationHandler,
    data,
    loading,
    error,
  };
};

export default useDeleteCartItemMutation;
