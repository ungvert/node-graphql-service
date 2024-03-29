import { renameId } from "../../../common/resolvers.js";
import { PaginationArgs, WithoutId } from "../../../common/resolver-args.js";
import { AppContext } from "../../app.module.js";

export interface GetBandByIdArgs {
  id: string;
}

export interface CreateBandInputArgs {
  band: WithoutId<Band>;
}

export interface UpdateBandInputArgs {
  band: Band;
}

export interface DeleteBandInputArgs {
  id: string;
}

export interface Band {
  id: string;
  name: string;
  origin: string;
  members: Member[];
  website: string;
  genres: string[];
}

type Member = {
  artist: string;
  instrument: string;
  years: string[];
};

export const bandsResolvers = {
  Band: {
    id: renameId,
    genres(parent: any, _: undefined, { dataSources }: AppContext) {
      return parent.genresIds.map((id: string) => dataSources.genresAPI.getOne(id));
    },
  },
  Member: {
    artist(parent: any, _: undefined, { dataSources }: AppContext) {
      return dataSources.artistsAPI.getOne(parent.artist);
    },
  },
  Query: {
    bands(_: undefined, args: PaginationArgs, { dataSources }: AppContext) {
      return dataSources.bandsAPI.getAll(args);
    },
    band(_: undefined, { id }: GetBandByIdArgs, { dataSources }: AppContext) {
      return dataSources.bandsAPI.getOne(id);
    },
  },
  Mutation: {
    createBand(_: undefined, args: CreateBandInputArgs, { dataSources }: AppContext) {
      return dataSources.bandsAPI.create(args);
    },
    updateBand(_: undefined, args: UpdateBandInputArgs, { dataSources }: AppContext) {
      return dataSources.bandsAPI.update(args);
    },
    deleteBand(_: undefined, args: DeleteBandInputArgs, { dataSources }: AppContext) {
      return dataSources.bandsAPI.remove(args);
    },
  },
};
