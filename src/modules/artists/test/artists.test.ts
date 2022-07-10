import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import {
  cachedJwt,
  loginTestUser,
  registerTestUser,
} from "../../users/test/create-test-user";
import { createTestArtist, removeTestArtist, testArtist } from "./create-test-artist.js";
import { createTestBand, removeTestBand } from "../../bands/test/create-test-band.js";

describe("Artists module", () => {
  let input = { ...testArtist };
  beforeAll(async () => {
    if (!cachedJwt) {
      await registerTestUser();
      await loginTestUser();
    }

    const responseBand = await createTestBand();
    const band = responseBand?.data?.createBand;
    input.bandsIds = [band?.id];
  });
  afterAll(async () => {
    await removeTestBand(input.bandsIds[0]);
  });

  it("creates artist", async () => {
    const response = await createTestArtist(input);

    const errors = response.errors;
    expect(errors).toBe(undefined);

    const id = response?.data?.createArtist?.id;
    expect(id).toBeTruthy();
    input.id = id;
  });

  it("updates band", async () => {
    const updatedName = "updated";
    const updatedInput = { ...input, firstName: updatedName };

    const response = await sendTestRequest(
      gql`
        mutation UpdateArtist($artist: UpdateArtistInput!) {
          updateArtist(artist: $artist) {
            id
            firstName
            secondName
            middleName
            birthDate
            birthPlace
            country
            bands {
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
            instruments
          }
        }
      `,
      { variables: { artist: updatedInput }, headers: { Authorization: cachedJwt } }
    );
    const band = response?.data?.updateArtist;
    const errors = response.errors;
    expect(errors).toBe(undefined);
    expect(band.firstName).toBe(updatedName);
  });

  describe("without auth", () => {
    it("gets artists", async () => {
      const response = await sendTestRequest(
        gql`
          query Artists($limit: Int, $offset: Int) {
            artists(limit: $limit, offset: $offset) {
              items {
                id
                firstName
                secondName
                middleName
                birthDate
                birthPlace
                country
                bands {
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
                instruments
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
      const artists = response?.data?.artists?.items;
      const errors = response?.errors;
      expect(errors).toBe(undefined);
      expect(artists).toBeTruthy();
      expect(artists[0].id).toBeTruthy();
    });
    it("gets band by Id", async () => {
      const response = await sendTestRequest(
        gql`
          query Artist($artistId: ID!) {
            artist(id: $artistId) {
              id
              firstName
              secondName
              middleName
              birthDate
              birthPlace
              country
              bands {
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
              instruments
            }
          }
        `,
        { variables: { artistId: input.id } }
      );
      const artist = response?.data?.artist;
      const errors = response.errors;
      expect(errors).toBe(undefined);
      expect(artist.id).toBeTruthy();
    });
  });

  it("deletes band", async () => {
    const response = await removeTestArtist(input.id);
    const result = response?.data?.deleteArtist;
    const errors = response.errors;
    expect(errors).toBe(undefined);
    expect(result.deletedCount).toBe(1);
  });
});
