import { GraphQLResolveInfo } from "graphql";
import { renameId } from "../../common/fields-renaming.js";
import { AppContext } from "../app.module.js";

export interface RegisterUserArgs {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface LoginUserArgs {
  password: string;
  email: string;
}

export interface GetUserArgs {
  id: string;
}

export const userResolvers = {
  User: {
    id: renameId,
  },
  Query: {
    user(_: undefined, args: GetUserArgs, { dataSources }: AppContext) {
      return dataSources.usersAPI.getOne(args);
    },
    jwt(_: undefined, args: RegisterUserArgs, { dataSources }: AppContext) {
      return dataSources.usersAPI.login(args);
    },
  },
  Mutation: {
    register(_: undefined, args: RegisterUserArgs, { dataSources }: AppContext) {
      return dataSources.usersAPI.register(args);
    },
  },
};
