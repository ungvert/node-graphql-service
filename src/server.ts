import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { resolvers, typeDefs } from "./modules/example.js";

export const createServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  const httpServer = http.createServer(app);
  await server.start();
  server.applyMiddleware({ app });

  return httpServer;
};
