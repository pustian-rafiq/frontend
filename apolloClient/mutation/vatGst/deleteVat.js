import { gql, useMutation } from "@apollo/client";
import { GET_VAT_GST_LIST } from "../../queries/vatGst/vatGstListQuery";

export const DELETE_VAT_GST = gql`
  mutation ($id: ID!) {
    vatDelete(id: $id) {
      vat {
        id
      }
    }
  }
`;

const useDeleteVat = () => {
  const [vatDelete, { data, loading, error }] = useMutation(DELETE_VAT_GST, {
    refetchQueries: [GET_VAT_GST_LIST],
  });
  return {
    vatDelete,
    data,
    loading,
    error,
  };
};

export default useDeleteVat;
