import { renameId } from "../../common/fields-renaming.js";
import { PaginationArgs } from "../../common/resolver-args.js";
import { AppContext } from "../app.module.js";

export interface GetBandByIdArgs {
  id: string;
}

export interface CreateBandInputArgs {
  band: {
    name: string;
    origin: string;
    members: Member[];
    website: string;
    genres: string[];
  };
}

export interface UpdateBandInputArgs {
  band: {
    id: string;
    name: string;
    origin: string;
    members: Member[];
    website: string;
    genres: string[];
  };
}

export interface DeleteBandInputArgs {
  id: string;
}

type Member = {
  name: string;
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
