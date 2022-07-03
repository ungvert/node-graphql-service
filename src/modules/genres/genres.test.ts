import { beforeAll, describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import {
  cachedJwt,
  loginTestUser,
  registerTestUser,
  sendTestRequest,
} from "../../common/test-utils.js";

describe("Genres module", () => {
  describe("without auth", () => {
    let genreId: string;
    it("gets genres", async () => {
      const response = await sendTestRequest(
        gql`
          query Genres {
            genres {
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
        `
      );
      const genres = response?.data?.genres?.items;
      const errors = response?.errors;
      expect(errors).toBeFalsy();
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
      expect(errors).toBeFalsy();
      expect(genre.id).toBeTruthy();
    });
  });

  describe("with auth", () => {
    beforeAll(async () => {
      if (!cachedJwt) {
        await registerTestUser();
        await loginTestUser();
      }
    });

    const testGenre = {
      name: "Post-punk",
      description:
        "Style of rock music inspired by punk but less aggressive in performance and musically more experimental.",
      country: "United Kingdom",
      year: 1978,
      id: undefined,
    };

    it("creates genre", async () => {
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
        { variables: { genre: testGenre }, headers: { Authorization: cachedJwt } }
      );
      const genre = response?.data?.createGenre;
      const errors = response.errors;
      expect(errors).toBeFalsy();
      const genreId = genre.id;
      expect(genreId).toBeTruthy();
      testGenre.id = genreId;
    });

    it("updates genre", async () => {
      const updatedGenre = { ...testGenre, name: "updated" };

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
      expect(errors).toBeFalsy();
      expect(genre).toStrictEqual(updatedGenre);
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
          variables: { deleteGenreId: testGenre.id },
          headers: { Authorization: cachedJwt },
        }
      );
      const result = response?.data?.deleteGenre;
      const errors = response.errors;
      expect(errors).toBeFalsy();
      expect(result.deletedCount).toBe(1);
    });
  });
});
