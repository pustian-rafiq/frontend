import { gql, useMutation } from "@apollo/client";
import { GET_GALLARY } from "../../queries/historicalGallary/historicalGalleryQuery";

export const DELETE_HISTORY = gql`
  mutation ($id: ID!) {
    deleteHistoricalSlider(id: $id) {
      historicalSlider {
        id
      }
    }
  }
`;

const useDeleteGalary = () => {
  const [deleteHistoricalSlider, { data, loading, error }] = useMutation(
    DELETE_HISTORY,
    {
      refetchQueries: [
        GET_GALLARY, // DocumentNode object parsed with gql
      ],
    }
  );
  return {
    deleteHistoricalSlider,
    data,
    loading,
    error,
  };
};

export default useDeleteGalary;
