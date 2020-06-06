import { GraphQLScalarType, Kind } from 'graphql';
import { gql } from "apollo-server-express";
import moment from 'moment';

export const schema = gql` scalar Date `;

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    
    description: 'Date custom scalar type',
    
    serialize(value) {
      return moment(value, 'DD-MM-YYYY').format('DD-MM-YYYY');
    },

    parseValue(input) {
      return moment(input, 'DD-MM-YYYY').format('DD-MM-YYYY');
    },
    
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.INT: {
          return moment(ast.value).format("X");
        }
        case Kind.STRING: {
          return moment(ast.value, 'DD-MM-YYYY').format('DD-MM-YYYY');
        }
      }
    }
  })
};
