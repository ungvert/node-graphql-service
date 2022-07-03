import { renameId } from "../../common/fields-renaming.js";
import { PaginationArgs, WithoutId } from "../../common/resolver-args.js";
import { Album } from "../albums/albums.resolvers.js";
import { AppContext } from "../app.module.js";
import { Artist } from "../artists/artists.resolvers.js";
import { Band } from "../bands/bands.resolvers.js";
import { Genre } from "../genres/genres.resolvers.js";

export interface GetTrackByIdArgs {
  id: string;
}

export interface CreateTrackInputArgs {
  track: WithoutId<Track>;
}

export interface UpdateTrackInputArgs {
  track: Track;
}

export interface Track {
  id: string;
  title: string;
  albums: Album[];
  bands: Band[];
  duration: number;
  released: number;
  genres: Genre[];
  artists: Artist[];
}

export interface DeleteTrackInputArgs {
  id: string;
}

export const tracksResolvers = {
  Track: {
    id: renameId,
    album(parent: any, _: undefined, { dataSources }: AppContext) {
      return dataSources.albumsAPI.getOne(parent.albumId);
    },
    bands(parent: any, _: undefined, { dataSources }: AppContext) {
      return parent.bandsIds.map((id: string) => dataSources.bandsAPI.getOne(id));
    },
    artists(parent: any, _: undefined, { dataSources }: AppContext) {
      return parent.artistsIds.map((id: string) => dataSources.artistsAPI.getOne(id));
    },
    genres(parent: any, _: undefined, { dataSources }: AppContext) {
      return parent.genresIds.map((id: string) => dataSources.genresAPI.getOne(id));
    },
  },
  Query: {
    tracks(_: undefined, args: PaginationArgs, { dataSources }: AppContext) {
      return dataSources.tracksAPI.getAll(args);
    },
    track(_: undefined, { id }: GetTrackByIdArgs, { dataSources }: AppContext) {
      return dataSources.tracksAPI.getOne(id);
    },
  },
  Mutation: {
    createTrack(_: undefined, args: CreateTrackInputArgs, { dataSources }: AppContext) {
      return dataSources.tracksAPI.create(args);
    },
    updateTrack(_: undefined, args: UpdateTrackInputArgs, { dataSources }: AppContext) {
      return dataSources.tracksAPI.update(args);
    },
    deleteTrack(_: undefined, args: DeleteTrackInputArgs, { dataSources }: AppContext) {
      return dataSources.tracksAPI.remove(args);
    },
  },
};
