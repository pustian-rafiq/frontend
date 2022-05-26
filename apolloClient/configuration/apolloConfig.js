import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import {
  getMainDefinition,
  offsetLimitPagination,
  relayStylePagination,
  concatPagination,
} from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { createUploadLink } from "apollo-upload-client";
import ws from "ws";

// http link for query and mutation
const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql/",
  // uri: "http://backend:8000/graphql/",
});

// websocket link for subscription
const wsLink = new GraphQLWsLink(
  createClient({
    url:
      typeof window !== "undefined"
        ? "ws:http://localhost:8000/subscriptions/"
        : // : "ws:http://backend:8000/subscriptions/",
          "ws:http://localhost:8000/subscriptions/",

    webSocketImpl: ws,
  })
);

// conditionally serve link for query, mutation or subscription
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  createUploadLink({
    uri:
      typeof window !== "undefined"
        ? "http://localhost:8000/graphql/"
        : //  : "http://backend:8000/graphql/",
          "http://localhost:8000/graphql/",
  })
);

// initialize apollo client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          myProducts: relayStylePagination([]),
          vats: relayStylePagination([]),
        },
      },
    },
  }),
  // cache: new InMemoryCache(),
});

export default client;
