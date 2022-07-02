import { GetUserArgs, LoginUserArgs, RegisterUserArgs } from "./user.resolvers.js";
import { RESTDataSourceWithAuth } from "../../common/data-source-with-auth.js";
import "dotenv/config";

export interface UserService {
  register(userDto: RegisterUserArgs): Promise<unknown>;
  login(userDto: LoginUserArgs): Promise<unknown>;
  getOne(userDto: GetUserArgs): Promise<unknown>;
}

export class UsersAPI extends RESTDataSourceWithAuth implements UserService {
  constructor() {
    super();
    this.baseURL = process.env.users_url || "http://localhost:3004/v1/users";
  }

  async register(userDto: RegisterUserArgs) {
    const data = await this.post(`/register`, userDto);
    return data;
  }

  async login(userDto: LoginUserArgs) {
    const data = await this.post(`/login`, userDto);
    return data.jwt;
  }

  async getOne({ id }: GetUserArgs) {
    const data = await this.get(`/${id}`);
    return data;
  }
}
