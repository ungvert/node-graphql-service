import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "../../server.js";

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

export const userResolvers = {
  Query: {
    // user(
    //   parent: undefined,
    //   args: RegisterUserArgs,
    //   context: AppContext,
    //   info: GraphQLResolveInfo
    // ) {
    //   //   return context.userService.createUser(args.);
    //   return {};
    // },
    jwt(
      parent: undefined,
      args: RegisterUserArgs,
      { dataSources }: AppContext,
      info: GraphQLResolveInfo
    ) {
      return dataSources.usersAPI.login(args);
    },
  },
  Mutation: {
    register(
      parent: undefined,
      args: RegisterUserArgs,
      { dataSources }: AppContext,
      info: GraphQLResolveInfo
    ) {
      return dataSources.usersAPI.register(args);
    },
  },
};
