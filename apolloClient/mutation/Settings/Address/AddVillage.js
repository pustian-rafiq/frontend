import { gql, useMutation } from "@apollo/client";

const VILLAGE_ADD = gql`
  mutation villageAdd(
    $name: String!
    $wordnoId: ID
  ) {
    villageCreate(
      input: {
        name: $name
        wordnoId: $wordnoId
      }
    ) {
      village{
      id,
      name
       wordno{
           number
       }
    }
    }
  }
`;

const useVillageMutation = () => {
    const [villageMutationHandler, { loading, error, data }] =
        useMutation(VILLAGE_ADD);

    return { villageMutationHandler, loading, error, data };
};

export default useVillageMutation;
