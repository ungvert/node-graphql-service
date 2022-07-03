import { renameId } from "../../common/fields-renaming.js";
import { PaginationArgs, WithoutId } from "../../common/resolver-args.js";
import { AppContext } from "../app.module.js";

export interface Genre {
  id: string;
  name: string;
  description: string;
  country: string;
  year: number;
}
export type GenreId = Genre["id"];

export interface CreateGenreInputArgs {
  genre: WithoutId<Genre>;
}

export interface UpdateGenreInputArgs {
  genre: Genre;
}

export interface GetGenreByIdArgs {
  id: GenreId;
}

export const genresResolvers = {
  Genre: {
    id: renameId,
  },
  Query: {
    genres(_: undefined, args: PaginationArgs, { dataSources }: AppContext) {
      return dataSources.genresAPI.getAll(args);
    },
    genre(_: undefined, { id }: GetGenreByIdArgs, { dataSources }: AppContext) {
      return dataSources.genresAPI.getOne(id);
    },
  },
  Mutation: {
    createGenre(_: undefined, args: CreateGenreInputArgs, { dataSources }: AppContext) {
      return dataSources.genresAPI.create(args);
    },
    updateGenre(_: undefined, args: UpdateGenreInputArgs, { dataSources }: AppContext) {
      return dataSources.genresAPI.update(args);
    },
    deleteGenre(_: undefined, { id }: GetGenreByIdArgs, { dataSources }: AppContext) {
      return dataSources.genresAPI.remove(id);
    },
  },
};
