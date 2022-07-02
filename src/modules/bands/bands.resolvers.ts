import { renameId } from "../../common/fields-renaming.js";
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
    genres: string;
  };
}

export interface UpdateBandInputArgs {
  band: {
    id: string;
    name: string;
    origin: string;
    members: Member[];
    website: string;
    genres: string;
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

const renameResolvers = {
  Band: {
    id: renameId,
  },
};

export const resolvers = {
  Query: {
    bands(_: undefined, __: undefined, { dataSources }: AppContext) {
      return dataSources.bandsAPI.getAll();
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
  ...renameResolvers,
};