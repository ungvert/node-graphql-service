import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";

import { dataSources, resolvers, typeDefs } from "./modules/app.module.js";

export const createServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context: ({ req }) => ({ token: req.headers.authorization || "" }),
    dataSources,
  });
  const httpServer = http.createServer(app);
  await server.start();
  server.applyMiddleware({ app });

  return httpServer;
};
