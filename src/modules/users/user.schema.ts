import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    password: String!
    email: String!
  }

  type Query {
    user(id: ID!): User
    # Login user and get JWT token
    jwt(email: String!, password: String!): String
  }

  type Mutation {
    # Register user
    register(firstName: String, lastName: String, password: String!, email: String!): User
  }
`;
