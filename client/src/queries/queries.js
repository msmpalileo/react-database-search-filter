import { gql } from "apollo-boost";

const getUsers = gql`
  {
    users {
      firstName
      lastName
      id
    }
  }
`;

const getProfiles = gql`
  query($userID: String) {
    profiles(userID: $userID) {
      state
      street
      city
      zip
      rent
      userID
    }
  }
`;

const addProfiles = gql`
  mutation(
    $state: String!
    $street: String!
    $city: String!
    $zip: String!
    $rent: Int!
    $userID: String!
  ) {
    addProfile(
      state: $state
      street: $street
      city: $city
      zip: $zip
      rent: $rent
      userID: $userID
    ) {
      userID
      state
      street
      city
      zip
      rent
    }
  }
`;

const addUsers = gql`
  mutation($firstName: String!, $lastName: String!) {
    addUser(firstName: $firstName, lastName: $lastName) {
      firstName
      lastName
    }
  }
`;

export { getUsers, getProfiles, addProfiles, addUsers };
