import { gql, useQuery } from "@apollo/client";
import client from "../../configuration/apolloConfig";

// query
export const GET_VAT_GST = gql`
  query ($id: ID!) {
    vat(id: $id) {
      id
      county
      city
      country {
        name
        id
      }
      percentageAmt
      sector
      state
      description
    }
  }
`;

const useVatGst = (id) => {
  const { loading, error, data } = useQuery(GET_VAT_GST, {
    variables: { id: id },
  });

  // const { data } = await client.query({
  //   query: GET_VAT_GST,
  //   variables: { id: id },
  // });

  return {
    loading,
    error,
    data,
  };
};

export default useVatGst;
