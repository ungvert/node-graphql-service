import { describe, expect, it } from "vitest";
import { sendTestRequest } from "./common/test-utils/send-test-request.js";
import { gql } from "apollo-server-express";

describe("graphql api server", () => {
  it("exists", async () => {
    const response = await sendTestRequest(gql`
      query {
        __typename
      }
    `);

    expect(response).toEqual({
      data: {
        __typename: "Query",
      },
    });
  });
});
