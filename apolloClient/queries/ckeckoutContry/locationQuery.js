import { gql } from "@apollo/client";

// query
export const USER_LOCATION = gql`
  query {
    countries {
      edges {
        node {
          name
          id

          divisionOrStates {
            edges {
              node {
                name
                id

                districtOrCities {
                  edges {
                    node {
                      name
                      id
                      policeStations {
                        edges {
                          node {
                            name
                            id

                            municipalities {
                              edges {
                                node {
                                  name
                                  id
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
