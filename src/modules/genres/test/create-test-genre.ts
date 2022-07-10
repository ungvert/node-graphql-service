import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import { cachedJwt } from "../../users/test/create-test-user.js";

export const testGenre = {
  name: "Post-punk",
  description:
    "Style of rock music inspired by punk but less aggressive in performance and musically more experimental.",
  country: "United Kingdom",
  year: 1978,
  id: undefined,
};

export async function createTestGenre(genre: any = testGenre) {
  const response = await sendTestRequest(
    gql`
      mutation CreateGenre($genre: CreateGenreInput!) {
        createGenre(genre: $genre) {
          id
          name
          description
          country
          year
        }
      }
    `,
    { variables: { genre }, headers: { Authorization: cachedJwt } }
  );
  return response;
}
