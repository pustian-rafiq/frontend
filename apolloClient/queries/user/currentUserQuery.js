import { gql, useQuery } from "@apollo/client";

// query
export const GET_CURRENT_USER = gql`
  query {
    me {
      username
      verified
      isStaff
      consumers {
        username
        id
      }
    }
  }
`;

// const useCurrentUser = () => {
//   const { loading, error, data } = useQuery(GET_CURRENT_USER);

//   return {
//     loading,
//     error,
//     data,
//   };
// };

// export default useCurrentUser;
