import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  {
    continents {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const GET_COUNTRY_BY_CONTINENT = gql`
  query ($id: ID!) {
    continent(id: $id) {
      id
      name
      countries {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;
export const GET_DIVISION_STATE = gql`
  query ($id: ID!) {
    country(id: $id) {
      id
      name
      divisionOrStates {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
export const GET_DISTRICT_CITY = gql`
  query ($id: ID!) {
    divisionOrState(id: $id) {
      id
      name
      districtOrCities {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
export const GET_POLICE_STATION = gql`
  query ($id: ID!) {
    districtOrCity(id: $id) {
      id
      name
      policeStations {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;
export const GET_SUB_DISTRICT = gql`
  query ($id: ID!) {
    districtOrCity(id: $id) {
      id
      name
      subDisticts {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
export const GET_ROAD_OR_STREET = gql`
  query ($id: ID!) {
    policeStation(id: $id) {
      id
      name
      roads {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }
`;

export const GET_POST_OFFICES = gql`
  query ($id: ID!) {
    policeStation(id: $id) {
      id
      name
      postoffices {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
export const GET_MUNICIPALITIES = gql`
  query ($id: ID!) {
    policeStation(id: $id) {
      id
      name
      municipalities {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
export const GET_UNIONS = gql`
  query ($id: ID!) {
    policeStation(id: $id) {
      id
      name
      unions {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
export const GET_WARD_NO = gql`
  query ($id: ID!) {
    municipality(id: $id) {
      id
      name
      wordnos {
        edges {
          node {
            id
            number
          }
        }
      }
    }
  }
`;
export const GET_VILLAGES = gql`
  query ($id: ID!) {
    wordNo(id: $id) {
      id
      number
      villages {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;
