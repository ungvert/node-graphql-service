import { describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import { loginTestUser, registerTestUser, testUser } from "./create-test-user";

describe("Users module", () => {
  let userId: string;

  it("registers user", async () => {
    const [{ id }, errors] = await registerTestUser();
    expect(errors).toBe(undefined);
    expect(id).toBeTruthy();
  });

  it("logins and gets jwt", async () => {
    const [jwt, errors] = await loginTestUser();
    expect(errors).toBe(undefined);
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
    expect(response.errors).toBe(undefined);
    const user = response.data?.user;
    expect(user.id).toBeTruthy();
  });
});
