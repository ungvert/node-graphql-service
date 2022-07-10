import { RequestOptions } from "apollo-datasource-rest";
import { RESTDataSourceWithAuth } from "../../../common/data-source-with-auth.js";
import "dotenv/config";
import {
  CreateGenreInputArgs,
  GenreId,
  UpdateGenreInputArgs,
} from "../resolvers/genres.resolvers.js";
import { PaginationArgs } from "../../../common/resolver-args.js";

export interface GenresService {
  getOne(id: GenreId): Promise<unknown>;
  getAll(args: PaginationArgs): Promise<unknown>;
  create(args: CreateGenreInputArgs): Promise<unknown>;
  update(args: UpdateGenreInputArgs): Promise<unknown>;
  remove(id: GenreId): Promise<unknown>;
}

export class GenresAPI extends RESTDataSourceWithAuth implements GenresService {
  constructor() {
    super();
    this.baseURL = process.env.genres_url || "http://localhost:3001/v1/genres";
  }

  async getAll({ limit, offset }: PaginationArgs) {
    const data = await this.get(`/`, {
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    });
    return data;
  }
  async getOne(id: GenreId) {
    const data = await this.get(`/${id}`);
    return data;
  }

  async create({ genre }: CreateGenreInputArgs) {
    const data = await this.post(`/`, genre);
    return data;
  }
  async update({ genre }: UpdateGenreInputArgs) {
    const data = await this.put(`/${genre.id}`, genre);
    return data;
  }
  async remove(id: GenreId) {
    const data = await this.delete(`/${id}`);
    return data;
  }
}
