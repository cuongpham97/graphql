import { gql } from "apollo-server-express";

export const schema = [
  gql`
    extend type Query {
      getUsers: [User]
    }

    extend type Mutation {
      addUser(input: UserInput): User
    }

    type User @auth {
      _id: ID,
      name: UserName!,
      age: Int,
      birthday: Date,
      gender: UserGender
    }

    type UserName {
      firstName: String,
      lastName: String,
      displayName: String!,
    }

    enum UserGender { 
      MALE, 
      FEMALE 
    }

    input UserInput {
      name: UserNameInput!,
      age: Int,
      birthday: Date,
      gender: UserGender
    }

    input UserNameInput {
      firstName: String,
      lastName: String,
      displayName: String!,
    }
  `
];

export const resolvers = {
  Query: {
    getUsers(obj: any, args: any, context: any, info: any) {
      return [
        { name: { displayName: 'Cường' }, age: 23, birthday: '27-09-1997' }
      ];
    }
  },

  Mutation: {
    addUser(obj: any, args: any, context: any, info: any) {
      console.log(args);
      return { name: { displayName: 'Cường' }, age: 23, birthday: '27-09-1997' }
    }
  }
}
