import { RequestOptions } from "apollo-datasource-rest";
import { RESTDataSourceWithAuth } from "../../common/data-source-with-auth.js";
import "dotenv/config";
import {
  CreateArtistInputArgs,
  DeleteArtistInputArgs,
  UpdateArtistInputArgs,
} from "./artists.resolvers.js";
import { PaginationArgs } from "../../common/resolver-args.js";

export interface ArtistsService {
  getOne(id: string): Promise<unknown>;
  getAll(args: PaginationArgs): Promise<unknown>;
  create(args: CreateArtistInputArgs): Promise<unknown>;
  update(args: UpdateArtistInputArgs): Promise<unknown>;
  remove(args: DeleteArtistInputArgs): Promise<unknown>;
}

export class ArtistsAPI extends RESTDataSourceWithAuth implements ArtistsService {
  constructor() {
    super();
    this.baseURL = process.env.artists_url || "http://localhost:3002/v1/artists";
  }

  async getAll({ limit, offset }: PaginationArgs) {
    const data = await this.get(`/`, {
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    });
    return data;
  }
  async getOne(id: string) {
    const data = await this.get(`/${id}`);
    return data;
  }

  async create({ artist }: CreateArtistInputArgs) {
    const data = await this.post(`/`, artist);
    return data;
  }
  async update({ artist }: UpdateArtistInputArgs) {
    const data = await this.put(`/${artist.id}`, artist);
    return data;
  }
  async remove({ id }: DeleteArtistInputArgs) {
    const data = await this.delete(`/${id}`);
    return data;
  }
}
