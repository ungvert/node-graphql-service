import { renameId } from "../../common/fields-renaming.js";
import { PaginationArgs, WithoutId } from "../../common/resolver-args.js";
import { AppContext } from "../app.module.js";
import { Band } from "../bands/bands.resolvers.js";

export interface GetArtistByIdArgs {
  id: string;
}

export interface CreateArtistInputArgs {
  artist: WithoutId<Artist>;
}

export interface UpdateArtistInputArgs {
  artist: Artist;
}

export interface Artist {
  id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bands: Band[];
  instruments: string;
}

export interface DeleteArtistInputArgs {
  id: string;
}

export const artistsResolvers = {
  Artist: {
    id: renameId,
    bands(parent: any, _: undefined, { dataSources }: AppContext) {
      return parent.bandsIds.map((id: string) => dataSources.bandsAPI.getOne(id));
    },
  },
  Query: {
    artists(_: undefined, args: PaginationArgs, { dataSources }: AppContext) {
      return dataSources.artistsAPI.getAll(args);
    },
    artist(_: undefined, { id }: GetArtistByIdArgs, { dataSources }: AppContext) {
      return dataSources.artistsAPI.getOne(id);
    },
  },
  Mutation: {
    createArtist(_: undefined, args: CreateArtistInputArgs, { dataSources }: AppContext) {
      return dataSources.artistsAPI.create(args);
    },
    updateArtist(_: undefined, args: UpdateArtistInputArgs, { dataSources }: AppContext) {
      return dataSources.artistsAPI.update(args);
    },
    deleteArtist(_: undefined, args: DeleteArtistInputArgs, { dataSources }: AppContext) {
      return dataSources.artistsAPI.remove(args);
    },
  },
};
