import { beforeAll, describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import {
  cachedJwt,
  loginTestUser,
  registerTestUser,
} from "../../users/test/create-test-user";
import { createTestGenre } from "../../genres/test/create-test-genre.js";
import { testBand } from "../../bands/test/create-test-band.js";

describe.todo("Artists module", () => {
  describe("without auth", () => {
    let bandId: string;
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
                    name
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
      expect(errors).toBeFalsy();
      expect(artists).toBeTruthy();

      bandId = artists[0].id;
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
                name
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
        { variables: { bandId } }
      );
      const band = response?.data?.band;
      const errors = response.errors;
      expect(errors).toBeFalsy();
      expect(band.id).toBeTruthy();
    });
  });

  describe("with auth", () => {
    let bandInput = { ...testBand };
    let genreId: string;
    beforeAll(async () => {
      if (!cachedJwt) {
        await registerTestUser();
        await loginTestUser();
      }

      const responceGenre = await createTestGenre();
      const genreResponce = responceGenre?.data?.createGenre;
      genreId = genreResponce.id;
      bandInput.genresIds = [genreId];
    });

    it("creates band", async () => {
      const response = await sendTestRequest(
        gql`
          mutation CreateBand($band: CreateBandInput!) {
            createBand(band: $band) {
              id
              name
              origin
              members {
                name
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
        { variables: { band: testBand }, headers: { Authorization: cachedJwt } }
      );

      const band = response?.data?.createBand;
      const bandId = band?.id;
      expect(bandId).toBeTruthy();

      const errors = response.errors;
      expect(errors).toBeFalsy();
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
                name
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
      expect(errors).toBeFalsy();
      expect(band.name).toBe(updatedName);
    });

    it("deletes band  ", async () => {
      const response = await sendTestRequest(
        gql`
          mutation DeleteBand($deleteBandId: ID!) {
            deleteBand(id: $deleteBandId) {
              deletedCount
              acknowledged
            }
          }
        `,
        {
          variables: { deleteBandId: bandInput.id },
          headers: { Authorization: cachedJwt },
        }
      );
      const result = response?.data?.deleteBand;
      const errors = response.errors;
      expect(errors).toBeFalsy();
      expect(result.deletedCount).toBe(1);
    });
  });
});
