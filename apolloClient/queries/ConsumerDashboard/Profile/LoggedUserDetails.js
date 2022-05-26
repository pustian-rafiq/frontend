import { gql, useQuery } from "@apollo/client";
import client from "../../../configuration/apolloConfig";

export const LOGGED_USER_DETAILS = gql`
    query {
    me {
        username
        verified
        isStaff
        consumers{
            isMaster
            username
            photo
            user{
                firstName
                lastName
                email
            }
            consumeraddresses{
            continent{
              id
              name
            }
            country{
              id
              name
              currenciesSymbol
          localOneCurrencyToUsd 
          usd1ToLocalCurrency
            }
            divisionOrState{
              id
              name
            }
            districtOrCity{
              id
              name
            }
       }
        }
    }
    }
`

const useLoggedUser =  (token) => {
    // const {data,error,loading} = await client.query({
    //     query: LOGGED_USER_DETAILS,
    //     context: {
    //       headers: {
    //         Authorization: `JWT ${token}`,
    //       },
    //     },
    //   });
  const { loading, error, data } = useQuery(LOGGED_USER_DETAILS,
    {
        context: {
            headers: {
              Authorization: `JWT ${token}`,
            },
          },
    });

  return {
    loading,
    error,
    data,
  };
};

export default useLoggedUser;