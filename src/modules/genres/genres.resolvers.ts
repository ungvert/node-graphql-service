import { renameId } from "../../common/fields-renaming.js";
import { PaginationArgs } from "../../common/pagination.js";
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
  genre: Omit<Genre, "id">;
}

export interface UpdateGenreInputArgs {
  genre: Genre;
}

export interface GetGenreByIdArgs {
  id: GenreId;
}

const renameResolvers = {
  Genre: {
    id: renameId,
  },
};

export const genresResolvers = {
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
  ...renameResolvers,
};
