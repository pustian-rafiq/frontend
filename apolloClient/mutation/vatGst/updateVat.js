import { gql, useMutation } from "@apollo/client";
import { GET_VAT_GST_LIST } from "../../queries/vatGst/vatGstListQuery";

export const UPDATE_VAT_GST = gql`
  mutation (
    $id: ID!
    $sector: String!
    $description: String!
    $percentageAmt: Float!
    $country: ID!
    $state: String!
    $county: String!
    $city: String!
  ) {
    vatMutation(
      input: {
        id: $id
        sector: $sector
        description: $description
        percentageAmt: $percentageAmt
        country: $country
        state: $state
        county: $county
        city: $city
      }
    ) {
      vat {
        sector
        description
        percentageAmt
        state
        county
        city
        country {
          name
          id
        }
      }
    }
  }
`;

const useUpdateVat = () => {
  const [vatMutation, { data, loading, error }] = useMutation(UPDATE_VAT_GST, {
    refetchQueries: [
      GET_VAT_GST_LIST, // DocumentNode object parsed with gql
    ],
  });
  return {
    vatMutation,
    data,
    loading,
    error,
  };
};

export default useUpdateVat;
