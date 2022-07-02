import { mergeTypeDefs } from "@graphql-tools/merge";
import { typeDefs as bandsTypeDefs } from "./bands/bands.schema.js";
import { typeDefs as userTypeDefs } from "./users/user.schema.js";

import { userResolvers } from "./users/user.resolvers.js";
import { resolvers as bandsResolvers } from "./bands/bands.resolvers.js";
import { mergeResolvers } from "@graphql-tools/merge";

import { UsersAPI, UserService } from "./users/user.service.js";
import { BandsAPI, BandsService } from "./bands/bands.service.js";

export const typeDefs = mergeTypeDefs([userTypeDefs, bandsTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, bandsResolvers]);

export interface AppContext {
  token?: string;
  dataSources: {
    usersAPI: UserService;
    bandsAPI: BandsService;
  };
}

export const dataSources = () => ({
  usersAPI: new UsersAPI(),
  bandsAPI: new BandsAPI(),
});
