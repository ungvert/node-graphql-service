import { describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import { loginTestUser, registerTestUser, testUser } from "./create-test-user";

describe("Users module", () => {
  let userId: string;

  it("registers user", async () => {
    const response = await registerTestUser();
    userId = response?.data?.register?.id;
    expect(userId).toBeTruthy();
  });

  it("logins and gets jwt", async () => {
    const response = await loginTestUser();
    const jwt = response.data?.jwt;
    expect(jwt).toBeTruthy();
  });

  it("gets user by id", async () => {
    const response = await sendTestRequest(
      gql`
        query User($userId: ID!) {
          user(id: $userId) {
            id
            firstName
            lastName
            password
            email
          }
        }
      `,
      {
        variables: {
          userId: testUser.id,
        },
      }
    );

    const user = response.data?.user;
    expect(user.id).toBeTruthy();
  });
});