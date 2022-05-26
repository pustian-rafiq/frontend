import { gql } from "@apollo/client";
import client from "../../../configuration/apolloConfig";

const CONSUMER_LOGIN_WITH_CIN = gql`
  mutation consumerLogin($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      token
      refreshToken
      user {
        id
        username
        isStaff
        verified
        email
        firstName
        lastName
        consumers {
          isMaster
          photo
          phone
          country {
            id
            currenciesSymbol
            localOneCurrencyToUsd
            usd1ToLocalCurrency
          }
        }
      }
    }
  }
`;

const CONSUMER_LOGIN_WITH_EMAIL = gql`
  mutation consumerLogin($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      success
      errors
      token
      refreshToken
      user {
        id
        username
        isStaff
        verified
        email
        firstName
        lastName
        consumers {
          isMaster
          photo
          phone
          country {
            id
            currenciesSymbol
            localOneCurrencyToUsd
            usd1ToLocalCurrency
          }
        }
      }
    }
  }
`;

const useConsumerLoginMutation = (credentials) => {
  let data = null;

  if (credentials.email) {
    data = client.mutate({
      mutation: CONSUMER_LOGIN_WITH_EMAIL,
      variables: {
        email: credentials.email,
        password: credentials.password,
      },
    });
  } else {
    data = client.mutate({
      mutation: CONSUMER_LOGIN_WITH_CIN,
      variables: {
        username: credentials.username,
        password: credentials.password,
      },
    });
  }

  return data;
};

export default useConsumerLoginMutation;
