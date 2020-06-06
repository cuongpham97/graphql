import merge from 'lodash/merge';
import { gql } from "apollo-server-express";
import { makeExecutableSchema } from 'graphql-tools';

import {
  schema as scalarSchemas,
  resolvers as scalarResolvers
} from '../scripts/scalars';

import { 
  schema as directiveSchemas,
  directives
} from '../scripts/directives';

import {
  schema as usersSchema,
  resolvers as usersResolvers
} from './users';

const schema = [
  ...scalarSchemas,
  ...directiveSchemas,
  ...usersSchema
];

const resolvers = merge(
  scalarResolvers,
  usersResolvers
);
  
const schemaDirectives = directives;

const typeDefs = [
  gql`
    schema { query: Query, mutation: Mutation } 
    type Query 
    type Mutation
  `,
  ...schema
];

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives
});
