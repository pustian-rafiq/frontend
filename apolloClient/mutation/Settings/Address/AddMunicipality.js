import { gql, useMutation } from "@apollo/client";

const MUNICIPALITY_ADD = gql`
  mutation municipalityAdd(
    $name: String!
    $policeStationId: ID!
  ) {
    municipalityCreate(
      input: {
        name: $name
        policeStationId: $policeStationId
      }
    ) {
      municipality{
      id,
      name
       policeStation{
          name
        }
    }
    }
  }
`;

const useMunicipalityMutation = () => {
    const [municipalityMutationHandler, { loading, error, data }] =
        useMutation(MUNICIPALITY_ADD);

    return { municipalityMutationHandler, loading, error, data };
};

export default useMunicipalityMutation;
