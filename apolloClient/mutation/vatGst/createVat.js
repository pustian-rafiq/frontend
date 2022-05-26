import { gql, useMutation } from "@apollo/client";
import { GET_VAT_GST_LIST } from "../../queries/vatGst/vatGstListQuery";

export const CREATE_VAT_GST = gql`
  mutation (
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

const useCreateVat = () => {
  const [vatMutation, { data, loading, error }] = useMutation(CREATE_VAT_GST, {
    refetchQueries: [GET_VAT_GST_LIST],
  });
  return {
    vatMutation,
    data,
    loading,
    error,
  };
};

export default useCreateVat;
