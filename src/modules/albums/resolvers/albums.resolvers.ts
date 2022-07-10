import { renameId } from "../../../common/resolvers.js";
import { PaginationArgs, WithoutId } from "../../../common/resolver-args.js";
import { AppContext } from "../../app.module.js";
import { Artist } from "../../artists/resolvers/artists.resolvers.js";
import { Band } from "../../bands/resolvers/bands.resolvers.js";
import { Genre } from "../../genres/resolvers/genres.resolvers.js";
import { Track } from "../../tracks/resolvers/tracks.resolvers.js";

export interface GetAlbumByIdArgs {
  id: string;
}

export interface CreateAlbumInputArgs {
  album: WithoutId<Album>;
}

export interface UpdateAlbumInputArgs {
  album: Album;
}

export interface Album {
  id: string;
  name: string;
  released: number;
  artists: Artist[];
  bands: Band[];
  tracks: Track[];
  genres: Genre[];
  image: String;
}

export interface DeleteAlbumInputArgs {
  id: string;
}

export const albumsResolvers = {
  Album: {
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
      return parent.trackIds.map((id: string) => dataSources.tracksAPI.getOne(id));
    },
  },
  Query: {
    albums(_: undefined, args: PaginationArgs, { dataSources }: AppContext) {
      return dataSources.albumsAPI.getAll(args);
    },
    album(_: undefined, { id }: GetAlbumByIdArgs, { dataSources }: AppContext) {
      return dataSources.albumsAPI.getOne(id);
    },
  },
  Mutation: {
    createAlbum(_: undefined, args: CreateAlbumInputArgs, { dataSources }: AppContext) {
      return dataSources.albumsAPI.create(args);
    },
    updateAlbum(_: undefined, args: UpdateAlbumInputArgs, { dataSources }: AppContext) {
      return dataSources.albumsAPI.update(args);
    },
    deleteAlbum(_: undefined, args: DeleteAlbumInputArgs, { dataSources }: AppContext) {
      return dataSources.albumsAPI.remove(args);
    },
  },
};
