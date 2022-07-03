import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { bandsTypeDefs } from "./bands/bands.schema.js";
import { userTypeDefs } from "./users/user.schema.js";
import { genresTypeDefs } from "./genres/genres.schema.js";

import { userResolvers } from "./users/user.resolvers.js";
import { bandsResolvers } from "./bands/bands.resolvers.js";
import { genresResolvers } from "./genres/genres.resolvers.js";

import { UsersAPI, UserService } from "./users/user.service.js";
import { BandsAPI, BandsService } from "./bands/bands.service.js";
import { GenresAPI, GenresService } from "./genres/genres.service.js";

export const typeDefs = mergeTypeDefs([userTypeDefs, genresTypeDefs, bandsTypeDefs]);
export const resolvers = mergeResolvers([userResolvers, genresResolvers, bandsResolvers]);

export interface AppContext {
  token?: string;
  dataSources: {
    usersAPI: UserService;
    bandsAPI: BandsService;
    genresAPI: GenresService;
  };
}

export const dataSources = () => ({
  usersAPI: new UsersAPI(),
  bandsAPI: new BandsAPI(),
  genresAPI: new GenresAPI(),
});
