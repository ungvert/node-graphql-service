import { gql } from "apollo-server-express";
import { DocumentNode, print } from "graphql";
import request from "supertest";
import { createServer } from "../server.js";

let cachedServer: any;
export let cachedJwt: any;

export const sendTestRequest = async (
  query: DocumentNode,
  {
    variables = {},
    headers = {},
  }: {
    variables?: any;
    headers?: { [key: string]: string };
  } = {}
): Promise<any> => {
  const server = cachedServer ?? (await createServer());
  cachedServer = server;
  const requestBuilder = request(server).post("/graphql");

  Object.entries(headers).forEach(([key, value]) => {
    requestBuilder.set(key, value);
  });
  const { text } = await requestBuilder.send({
    variables,
    query: print(query),
  });
  return JSON.parse(text);
};

export const testUser = {
  firstName: "first name",
  lastName: "last name",
  password: "118649qwe",
  email: "met9129@gmail.com",
  id: undefined,
};

export const registerTestUser = async (): Promise<any> => {
  const response = await sendTestRequest(
    gql`
      mutation Register(
        $password: String!
        $email: String!
        $firstName: String
        $lastName: String
      ) {
        register(
          password: $password
          email: $email
          firstName: $firstName
          lastName: $lastName
        ) {
          firstName
          lastName
          password
          email
          id
        }
      }
    `,
    {
      variables: testUser,
    }
  );

  testUser.id = response.data?.register?.id;
  return response;
};

export const loginTestUser = async (): Promise<any> => {
  const response = await sendTestRequest(
    gql`
      query Jwt($email: String!, $password: String!) {
        jwt(email: $email, password: $password)
      }
    `,
    {
      variables: {
        password: testUser.password,
        email: testUser.email,
      },
    }
  );

  cachedJwt = response.data?.jwt;
  return response;
};
