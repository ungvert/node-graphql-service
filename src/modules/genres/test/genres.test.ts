import { beforeAll, describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import {
  cachedJwt,
  loginTestUser,
  registerTestUser,
} from "../../users/test/create-test-user";
import { createTestGenre, testGenre } from "./create-test-genre.js";

describe("Genres module", () => {
  let genreId: string;
  beforeAll(async () => {
    if (!cachedJwt) {
      await registerTestUser();
      await loginTestUser();
    }
  });

  it("creates genre", async () => {
    const response = await createTestGenre();
    const genre = response?.data?.createGenre;
    const errors = response.errors;
    expect(errors).toBe(undefined);
    genreId = genre.id;
    expect(genreId).toBeTruthy();
  });

  it("updates genre", async () => {
    const updatedGenre = { ...testGenre, id: genreId, name: "updated" };

    const response = await sendTestRequest(
      gql`
        mutation UpdateGenre($genre: UpdateGenreInput!) {
          updateGenre(genre: $genre) {
            id
            name
            description
            country
            year
          }
        }
      `,
      { variables: { genre: updatedGenre }, headers: { Authorization: cachedJwt } }
    );
    const genre = response?.data?.updateGenre;
    const errors = response.errors;
    expect(errors).toBe(undefined);
    expect(genre).toStrictEqual(updatedGenre);
  });

  describe("without auth", () => {
    it("gets genres", async () => {
      const response = await sendTestRequest(
        gql`
          query Genres($limit: Int, $offset: Int) {
            genres(limit: $limit, offset: $offset) {
              items {
                id
                name
                description
                country
                year
              }
              limit
              offset
              total
            }
          }
        `,
        {
          variables: {
            limit: 1,
            offset: 0,
          },
        }
      );
      const genres = response?.data?.genres?.items;
      const errors = response?.errors;
      expect(errors).toBe(undefined);
      expect(genres).toBeTruthy();

      genreId = genres[0].id;
      expect(genreId).toBeTruthy();
    });
    it("gets genre by Id", async () => {
      const response = await sendTestRequest(
        gql`
          query Genre($genreId: ID!) {
            genre(id: $genreId) {
              id
              name
              description
              country
              year
            }
          }
        `,
        { variables: { genreId } }
      );
      const genre = response?.data?.genre;
      const errors = response.errors;
      expect(errors).toBe(undefined);
      expect(genre.id).toBeTruthy();
    });
  });

  it("deletes genre", async () => {
    const response = await sendTestRequest(
      gql`
        mutation DeleteGenre($deleteGenreId: ID!) {
          deleteGenre(id: $deleteGenreId) {
            acknowledged
            deletedCount
          }
        }
      `,
      {
        variables: { deleteGenreId: genreId },
        headers: { Authorization: cachedJwt },
      }
    );
    const result = response?.data?.deleteGenre;
    const errors = response.errors;
    expect(errors).toBe(undefined);
    expect(result.deletedCount).toBe(1);
  });
});
