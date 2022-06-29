import { LoginUserArgs, RegisterUserArgs } from "./user.resolvers.js";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import "dotenv/config";

export interface UserService {
  register(userDto: RegisterUserArgs): Promise<boolean>;
  login(userDto: LoginUserArgs): Promise<string>;
}

export class UsersAPI extends RESTDataSource implements UserService {
  constructor() {
    super();
    this.baseURL = process.env.users_url || "http://localhost:3004/v1/users";
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async register(userDto: RegisterUserArgs) {
    const data = await this.post(`/register`, userDto);
    data.id = data._id;
    return data;
  }

  async login(userDto: LoginUserArgs) {
    const data = await this.post(`/login`, userDto);
    return data.jwt;
  }
}
