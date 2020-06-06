import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './graphql';

const server = new ApolloServer({
  schema: schema
});

const app = express();
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log('server is running');
});
