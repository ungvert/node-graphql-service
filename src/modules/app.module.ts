import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { userTypeDefs } from "./users/user.schema.js";
import { userResolvers } from "./users/user.resolvers.js";
import { UsersAPI, UserService } from "./users/user.service.js";

import { bandsTypeDefs } from "./bands/bands.schema.js";
import { bandsResolvers } from "./bands/bands.resolvers.js";
import { BandsAPI, BandsService } from "./bands/bands.service.js";

import { genresTypeDefs } from "./genres/genres.schema.js";
import { genresResolvers } from "./genres/genres.resolvers.js";
import { GenresAPI, GenresService } from "./genres/genres.service.js";

import { artistsTypeDefs } from "./artists/artists.schema.js";
import { artistsResolvers } from "./artists/artists.resolvers.js";
import { ArtistsAPI, ArtistsService } from "./artists/artists.service.js";

import { albumsTypeDefs } from "./albums/albums.schema.js";
import { albumsResolvers } from "./albums/albums.resolvers.js";
import { AlbumsAPI, AlbumsService } from "./albums/albums.service.js";

export const typeDefs = mergeTypeDefs([
  userTypeDefs,
  genresTypeDefs,
  bandsTypeDefs,
  artistsTypeDefs,
  albumsTypeDefs,
]);

export const resolvers = mergeResolvers([
  userResolvers,
  genresResolvers,
  bandsResolvers,
  artistsResolvers,
  albumsResolvers,
]);

export interface AppContext {
  token?: string;
  dataSources: {
    usersAPI: UserService;
    bandsAPI: BandsService;
    genresAPI: GenresService;
    artistsAPI: ArtistsService;
    albumsAPI: AlbumsService;
  };
}

export const dataSources = () => ({
  usersAPI: new UsersAPI(),
  bandsAPI: new BandsAPI(),
  genresAPI: new GenresAPI(),
  artistsAPI: new ArtistsAPI(),
  albumsAPI: new AlbumsAPI(),
});
