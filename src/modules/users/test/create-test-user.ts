import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request";
export let cachedJwt: any;

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
