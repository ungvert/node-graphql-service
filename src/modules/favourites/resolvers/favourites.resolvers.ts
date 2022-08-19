import { renameId } from "../../../common/resolvers.js";
import { AppContext } from "../../app.module.js";
import { Artist } from "../../artists/resolvers/artists.resolvers.js";
import { Band } from "../../bands/resolvers/bands.resolvers.js";
import { Genre } from "../../genres/resolvers/genres.resolvers.js";
import { Track } from "../../tracks/resolvers/tracks.resolvers.js";

export interface Favourites {
  id: string;
  userId: string;
  bands: Band[];
  genres: Genre[];
  artists: Artist[];
  tracks: Track[];
}

export type FavouritesType = "bands" | "genres" | "artists" | "tracks";

export interface AddToFavouritesArgs {
  id: string;
}

export const favouritesResolvers = {
  Favourites: {
    id: renameId,
    bands(parent: any, _: undefined, { dataSources }: AppContext) {
      return parent.bandsIds.map((id: string) => dataSources.bandsAPI.getOne(id));
    },
    artists(parent: any, _: undefined, { dataSources }: AppContext) {
      return parent.artistsIds.map((id: string) => dataSources.artistsAPI.getOne(id));
    },
    genres(parent: any, _: undefined, { dataSources }: AppContext) {
      return parent.genresIds.map((id: string) => dataSources.genresAPI.getOne(id));
    },
    tracks(parent: any, _: undefined, { dataSources }: AppContext) {
      return parent.tracksIds.map((id: string) => dataSources.tracksAPI.getOne(id));
    },
  },
  Query: {
    favourites(_: undefined, __: undefined, { dataSources }: AppContext) {
      return dataSources.favouritesAPI.getAll();
    },
  },
  Mutation: {
    addTrackToFavourites(
      _: undefined,
      { id }: AddToFavouritesArgs,
      { dataSources }: AppContext
    ) {
      return dataSources.favouritesAPI.add("tracks", id);
    },
    addArtistToFavourites(
      _: undefined,
      { id }: AddToFavouritesArgs,
      { dataSources }: AppContext
    ) {
      return dataSources.favouritesAPI.add("artists", id);
    },
    addBandToFavourites(
      _: undefined,
      { id }: AddToFavouritesArgs,
      { dataSources }: AppContext
    ) {
      return dataSources.favouritesAPI.add("bands", id);
    },
    addGenreToFavourites(
      _: undefined,
      { id }: AddToFavouritesArgs,
      { dataSources }: AppContext
    ) {
      return dataSources.favouritesAPI.add("genres", id);
    },

    removeTrackFromFavourites(
      _: undefined,
      { id }: AddToFavouritesArgs,
      { dataSources }: AppContext
    ) {
      return dataSources.favouritesAPI.remove("tracks", id);
    },
    removeArtistFromFavourites(
      _: undefined,
      { id }: AddToFavouritesArgs,
      { dataSources }: AppContext
    ) {
      return dataSources.favouritesAPI.remove("artists", id);
    },
    removeBandFromFavourites(
      _: undefined,
      { id }: AddToFavouritesArgs,
      { dataSources }: AppContext
    ) {
      return dataSources.favouritesAPI.remove("bands", id);
    },
    removeGenreFromFavourites(
      _: undefined,
      { id }: AddToFavouritesArgs,
      { dataSources }: AppContext
    ) {
      return dataSources.favouritesAPI.remove("genres", id);
    },
  },
};
