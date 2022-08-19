import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import {
  cachedJwt,
  loginTestUser,
  registerTestUser,
} from "../../users/test/create-test-user";
import { createTestGenre, removeTestGenre } from "../../genres/test/create-test-genre.js";
import { createTestBand, removeTestBand, testBand } from "./create-test-band.js";
import {
  createTestArtist,
  removeTestArtist,
} from "../../artists/test/create-test-artist.js";

describe("Bands module", () => {
  let bandInput = { ...testBand };
  let genreId: string;
  let artistId: string;
  beforeAll(async () => {
    if (!cachedJwt) {
      await registerTestUser();
      await loginTestUser();
    }

    const responceGenre = await createTestGenre();
    const genre = responceGenre?.data?.createGenre;
    genreId = genre.id;
    bandInput.genresIds = [genreId];

    const artistResponce = await createTestArtist();
    const artist = artistResponce?.data?.createArtist;
    artistId = artist.id;
    bandInput.members = [
      {
        artist: artistId,
        instrument: "вокал, гитара",
        years: ["1990", "1991", "1992"],
      },
    ];
  });
  afterAll(async () => {
    await removeTestGenre(genreId);
    await removeTestArtist(artistId);
  });

  it("creates band", async () => {
    const response = await createTestBand(bandInput);

    const band = response?.data?.createBand;
    const bandId = band?.id;

    const errors = response.errors;
    expect(errors).toBe(undefined);

    expect(bandId).toBeTruthy();
    bandInput.id = bandId;
  });

  it("updates band", async () => {
    const updatedName = "updated";
    const updatedBand = { ...bandInput, name: updatedName };

    const response = await sendTestRequest(
      gql`
        mutation UpdateBand($band: UpdateBandInput!) {
          updateBand(band: $band) {
            id
            name
            website
            origin
            members {
              artist {
                id
                firstName
              }
              instrument
              years
            }
            genres {
              id
              name
              description
              country
              year
            }
          }
        }
      `,
      { variables: { band: updatedBand }, headers: { Authorization: cachedJwt } }
    );
    const band = response?.data?.updateBand;
    const errors = response.errors;
    expect(errors).toBe(undefined);
    expect(band.name).toBe(updatedName);
  });

  describe("without auth", () => {
    it("gets bands", async () => {
      const response = await sendTestRequest(
        gql`
          query Bands($limit: Int, $offset: Int) {
            bands(limit: $limit, offset: $offset) {
              items {
                id
                name
                origin
                members {
                  artist {
                    id
                    firstName
                  }
                  instrument
                  years
                }
                website
                genres {
                  id
                  name
                  description
                  country
                  year
                }
              }
              total
              offset
              limit
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
      const bands = response?.data?.bands?.items;
      const errors = response?.errors;
      expect(errors).toBe(undefined);
      expect(bands).toBeTruthy();

      const bandId = bands[0].id;
      expect(bandId).toBeTruthy();
    });
    it("gets band by Id", async () => {
      const response = await sendTestRequest(
        gql`
          query Band($bandId: ID!) {
            band(id: $bandId) {
              id
              name
              origin
              members {
                artist {
                  id
                  firstName
                }
                instrument
                years
              }
              website
              genres {
                id
                name
                description
                country
                year
              }
            }
          }
        `,
        { variables: { bandId: bandInput.id } }
      );
      const band = response?.data?.band;
      const errors = response.errors;
      expect(errors).toBe(undefined);
      expect(band.id).toBeTruthy();
    });
  });

  it("deletes band", async () => {
    const response = await removeTestBand(bandInput.id);
    const result = response?.data?.deleteBand;
    const errors = response.errors;
    expect(errors).toBe(undefined);
    expect(result.deletedCount).toBe(1);
  });
});
