const graphql = require("graphql");
const _ = require("lodash");
const User = require("./models/user");
const Profile = require("./models/profile");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

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
        // return _.filter(profiles, { id: parent.id });
        return Profile.find({ userID: parent.id });
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
    rent: { type: GraphQLInt },
    userID: { type: GraphQLString }
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
        // return _.find(users, { id: args.id });
        return User.findById(args.id);
      }
    }
    // profile: {
    //   type: ProfileType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     // return _.find(profiles, { id: args.id });
    //     return Profile.find({})
    //   }
    // },
    // users: {
    //   type: new GraphQLList(UserType),
    //   resolve(parent, args) {
    //     // return users;
    //   }
    // }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull (GraphQLString) },
        lastName: { type: new GraphQLNonNull (GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName
        });
        return user.save();
      }
    },
    addProfile: {
      type: ProfileType,
      args: {
        street: { type: new GraphQLNonNull (GraphQLString) },
        city: { type: new GraphQLNonNull (GraphQLString) },
        state: { type: new GraphQLNonNull (GraphQLString) },
        zip: { type: new GraphQLNonNull (GraphQLString) },
        rent: { type: new GraphQLNonNull (GraphQLInt) },
        userID: { type: new GraphQLNonNull (GraphQLString) }
      },
      resolve(parent, args) {
        let profile = new Profile({
          street: args.street,
          city: args.city,
          state: args.state,
          zip: args.zip,
          rent: args.rent,
          userID: args.userID
        });
        return profile.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
