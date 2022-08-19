import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import {
  userResolvers,
  UsersAPI,
  UserService,
  userTypeDefs,
} from "./users/users.module.js";

import {
  BandsAPI,
  bandsResolvers,
  BandsService,
  bandsTypeDefs,
} from "./bands/bands.module.js";

import {
  GenresAPI,
  genresResolvers,
  GenresService,
  genresTypeDefs,
} from "./genres/genres.module.js";

import {
  ArtistsAPI,
  artistsResolvers,
  ArtistsService,
  artistsTypeDefs,
} from "./artists/artists.module.js";

import {
  AlbumsAPI,
  albumsResolvers,
  AlbumsService,
  albumsTypeDefs,
} from "./albums/albums.module.js";

import {
  TracksAPI,
  tracksResolvers,
  TracksService,
  tracksTypeDefs,
} from "./tracks/tracks.module.js";

import {
  FavouritesAPI,
  favouritesResolvers,
  FavouritesService,
  favouritesTypeDefs,
} from "./favourites/favourites.module.js";

export const typeDefs = mergeTypeDefs([
  userTypeDefs,
  genresTypeDefs,
  bandsTypeDefs,
  artistsTypeDefs,
  albumsTypeDefs,
  tracksTypeDefs,
  favouritesTypeDefs,
]);

export const resolvers = mergeResolvers([
  userResolvers,
  genresResolvers,
  bandsResolvers,
  artistsResolvers,
  albumsResolvers,
  tracksResolvers,
  favouritesResolvers,
]);

export interface AppContext {
  token?: string;
  dataSources: {
    usersAPI: UserService;
    bandsAPI: BandsService;
    genresAPI: GenresService;
    artistsAPI: ArtistsService;
    albumsAPI: AlbumsService;
    tracksAPI: TracksService;
    favouritesAPI: FavouritesService;
  };
}

export const dataSources = () => ({
  usersAPI: new UsersAPI(),
  bandsAPI: new BandsAPI(),
  genresAPI: new GenresAPI(),
  artistsAPI: new ArtistsAPI(),
  albumsAPI: new AlbumsAPI(),
  tracksAPI: new TracksAPI(),
  favouritesAPI: new FavouritesAPI(),
});
