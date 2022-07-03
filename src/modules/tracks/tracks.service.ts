import { RequestOptions } from "apollo-datasource-rest";
import { RESTDataSourceWithAuth } from "../../common/data-source-with-auth.js";
import "dotenv/config";
import {
  CreateTrackInputArgs,
  DeleteTrackInputArgs,
  UpdateTrackInputArgs,
} from "./tracks.resolvers.js";
import { PaginationArgs } from "../../common/resolver-args.js";

export interface TracksService {
  getOne(id: string): Promise<unknown>;
  getAll(args: PaginationArgs): Promise<unknown>;
  create(args: CreateTrackInputArgs): Promise<unknown>;
  update(args: UpdateTrackInputArgs): Promise<unknown>;
  remove(args: DeleteTrackInputArgs): Promise<unknown>;
}

export class TracksAPI extends RESTDataSourceWithAuth implements TracksService {
  constructor() {
    super();
    this.baseURL = process.env.tracks_url || "http://localhost:3006/v1/tracks";
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

  async create({ track }: CreateTrackInputArgs) {
    const data = await this.post(`/`, track);
    return data;
  }
  async update({ track }: UpdateTrackInputArgs) {
    const data = await this.put(`/${track.id}`, track);
    return data;
  }
  async remove({ id }: DeleteTrackInputArgs) {
    const data = await this.delete(`/${id}`);
    return data;
  }
}
