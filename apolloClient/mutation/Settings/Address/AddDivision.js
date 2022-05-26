import { gql, useMutation } from "@apollo/client";
import { GET_DIVISION_STATE } from "../../../queries/address/ContinentQuery";

const DIVISION_ADD = gql`
  mutation divisionAdd($name: String!, $countryId: ID!) {
    divisionOrStateMutation(input: { name: $name, countryId: $countryId }) {
      divisionOrState {
        id
        name
        country {
          name
        }
      }
    }
  }
`;

const useDivisionMutation = () => {
  const [divisionMutationHandler, { loading, error, data }] = useMutation(
    DIVISION_ADD,
    { refetchQueries: [GET_DIVISION_STATE] }
  );

  return { divisionMutationHandler, loading, error, data };
};

export default useDivisionMutation;
