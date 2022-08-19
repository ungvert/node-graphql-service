import { RequestOptions } from "apollo-datasource-rest";
import { RESTDataSourceWithAuth } from "../../../common/data-source-with-auth.js";
import "dotenv/config";
import { FavouritesType } from "../resolvers/favourites.resolvers.js";

export interface FavouritesService {
  getAll(): Promise<unknown>;
  add(type: FavouritesType, id: string): Promise<unknown>;
  remove(type: FavouritesType, id: string): Promise<unknown>;
}

export class FavouritesAPI extends RESTDataSourceWithAuth implements FavouritesService {
  constructor() {
    super();
    this.baseURL = process.env.favourites_url || "http://localhost:3007/v1/favourites";
  }

  async getAll() {
    const data = await this.get(`/`);
    return data;
  }
  async add(type: FavouritesType, id: string) {
    const data = await this.put(`/add`, { type, id });
    return data;
  }
  async remove(type: FavouritesType, id: string) {
    const data = await this.put(`/remove`, { type, id });
    return data;
  }
}
