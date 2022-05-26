import { gql, useMutation } from "@apollo/client";

const WORDNO_ADD = gql`
  mutation wordnoAdd(
    $number: String!
    $municipalityId: ID
  ) {
    wordNoCreate(
      input: {
        number: $number
        municipalityId: $municipalityId
      }
    ) {
      wordNo{
      id,
      number
       union{
          name
        }
    }
    }
  }
`;

const useWordnoMutation = () => {
    const [wordnoMutationHandler, { loading, error, data }] =
        useMutation(WORDNO_ADD);

    return { wordnoMutationHandler, loading, error, data };
};

export default useWordnoMutation;
