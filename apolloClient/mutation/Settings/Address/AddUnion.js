import { gql, useMutation } from "@apollo/client";

const UNION_ADD = gql`
  mutation unionAdd(
    $name: String!
    $policeStationId: ID!
  ) {
    unionCreate(
      input: {
        name: $name
        policeStationId: $policeStationId
      }
    ) {
      union{
      name
       policeStation{
          name
        }
    }
    }
  }
`;

const useUnionMutation = () => {
  const [unionMutationHandler, { loading, error, data }] =
    useMutation(UNION_ADD);

  return { unionMutationHandler, loading, error, data };
};

export default useUnionMutation;
