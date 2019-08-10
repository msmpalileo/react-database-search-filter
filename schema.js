const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require("graphql");

const _ = require("lodash");

//Dummy Data
let users = [
  { firstName: "Miguel", lastName: "Palileo", id: "1" },
  { firstName: "Joyce", lastName: "Mondejar", id: "2" },
  { firstName: "Renz", lastName: "Diansay", id: "3" }
];

let profiles = [
  {
    id: "1",
    street: "505 South Market St",
    city: "San Jose",
    state: "CA",
    zip: "95008",
    rent: 3500
  },
  {
    id: "1",
    street: "Oriental St",
    city: "Davao City",
    state: "Davao del Sur",
    zip: "8000",
    rent: 2500
  },
  {
    id: "2",
    street: "13th Street, Puan",
    city: "Davao City",
    state: "Davao del Sur",
    zip: "8000",
    rent: 1500
  },
  {
    id: "3",
    street: "Mango St., Dona Pilar",
    city: "Davao City",
    state: "Davao del Sur",
    zip: "8000",
    rent: 4000
  }
];

//Users
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve(parent, args) {
        return _.filter(profiles, { id: parent.id });
      }
    }
  })
});

//Profiles
const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    id: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    rent: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Code to get Data from DB/other source
        return _.find(users, { id: args.id });
      }
    },
    profile: {
      type: ProfileType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(profiles, { id: args.id });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
