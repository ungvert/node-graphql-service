import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { userResolvers } from "./modules/users/user.resolvers.js";
import { userTypeDefs } from "./modules/users/user.schema.js";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { UsersAPI, UserService } from "./modules/users/user.service.js";
export interface AppContext {
  token?: string;
  dataSources: {
    usersAPI: UserService;
  };
}

export const createServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: mergeTypeDefs([userTypeDefs]),
    resolvers: mergeResolvers([userResolvers]),
    csrfPrevention: true,
    cache: "bounded",
    context: ({ req }) => ({ token: req.headers.authorization || "" }),
    dataSources: () => ({
      usersAPI: new UsersAPI(),
    }),
  });
  const httpServer = http.createServer(app);
  await server.start();
  server.applyMiddleware({ app });

  return httpServer;
};
