import { RequestOptions } from "apollo-datasource-rest";
import { RESTDataSourceWithAuth } from "../../../common/data-source-with-auth.js";
import "dotenv/config";
import {
  CreateBandInputArgs,
  DeleteBandInputArgs,
  UpdateBandInputArgs,
} from "../resolvers/bands.resolvers.js";
import { PaginationArgs } from "../../../common/resolver-args.js";

export interface BandsService {
  getOne(id: string): Promise<unknown>;
  getAll(args: PaginationArgs): Promise<unknown>;
  create(args: CreateBandInputArgs): Promise<unknown>;
  update(args: UpdateBandInputArgs): Promise<unknown>;
  remove(args: DeleteBandInputArgs): Promise<unknown>;
}

export class BandsAPI extends RESTDataSourceWithAuth implements BandsService {
  constructor() {
    super();
    this.baseURL = process.env.bands_url || "http://localhost:3003/v1/bands";
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

  async create({ band }: CreateBandInputArgs) {
    const data = await this.post(`/`, band);
    return data;
  }
  async update({ band }: UpdateBandInputArgs) {
    const data = await this.put(`/${band.id}`, band);
    return data;
  }
  async remove({ id }: DeleteBandInputArgs) {
    const data = await this.delete(`/${id}`);
    return data;
  }
}
