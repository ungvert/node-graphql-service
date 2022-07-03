import { RequestOptions } from "apollo-datasource-rest";
import { RESTDataSourceWithAuth } from "../../common/data-source-with-auth.js";
import "dotenv/config";
import {
  CreateGenreInputArgs,
  GenreId,
  UpdateGenreInputArgs,
} from "./genres.resolvers.js";

export interface GenresService {
  getOne(id: GenreId): Promise<unknown>;
  getAll(): Promise<unknown>;
  create(args: CreateGenreInputArgs): Promise<unknown>;
  update(args: UpdateGenreInputArgs): Promise<unknown>;
  remove(id: GenreId): Promise<unknown>;
}

export class GenresAPI extends RESTDataSourceWithAuth implements GenresService {
  constructor() {
    super();
    this.baseURL = process.env.genres_url || "http://localhost:3001/v1/genres";
  }

  async getAll() {
    const data = await this.get(`/`);
    return data.items;
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
