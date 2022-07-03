import { RequestOptions } from "apollo-datasource-rest";
import { RESTDataSourceWithAuth } from "../../common/data-source-with-auth.js";
import "dotenv/config";
import {
  CreateAlbumInputArgs,
  DeleteAlbumInputArgs,
  UpdateAlbumInputArgs,
} from "./albums.resolvers.js";
import { PaginationArgs } from "../../common/resolver-args.js";

export interface AlbumsService {
  getOne(id: string): Promise<unknown>;
  getAll(args: PaginationArgs): Promise<unknown>;
  create(args: CreateAlbumInputArgs): Promise<unknown>;
  update(args: UpdateAlbumInputArgs): Promise<unknown>;
  remove(args: DeleteAlbumInputArgs): Promise<unknown>;
}

export class AlbumsAPI extends RESTDataSourceWithAuth implements AlbumsService {
  constructor() {
    super();
    this.baseURL = process.env.albums_url || "http://localhost:3005/v1/albums";
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

  async create({ album }: CreateAlbumInputArgs) {
    const data = await this.post(`/`, album);
    return data;
  }
  async update({ album }: UpdateAlbumInputArgs) {
    const data = await this.put(`/${album.id}`, album);
    return data;
  }
  async remove({ id }: DeleteAlbumInputArgs) {
    const data = await this.delete(`/${id}`);
    return data;
  }
}
