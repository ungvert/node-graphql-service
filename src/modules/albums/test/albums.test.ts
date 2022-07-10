import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import {
  cachedJwt,
  loginTestUser,
  registerTestUser,
} from "../../users/test/create-test-user";
import { createTestGenre, removeTestGenre } from "../../genres/test/create-test-genre.js";
import {
  createTestBand,
  removeTestBand,
  testBand,
} from "../../bands/test/create-test-band.js";
import { createTestAlbum, removeTestAlbum, testAlbum } from "./create-test-album.js";
import {
  createTestArtist,
  removeTestArtist,
} from "../../artists/test/create-test-artist.js";

describe("Albums module", () => {
  let input = { ...testAlbum };
  beforeAll(async () => {
    if (!cachedJwt) {
      await registerTestUser();
      await loginTestUser();
    }

    const responseBand = await createTestBand();
    const band = responseBand?.data?.createBand;
    input.bandsIds = [band?.id];

    const artistResponce = await createTestArtist();
    const artist = artistResponce?.data?.createArtist;
    input.artistsIds = [artist?.id];

    const responceGenre = await createTestGenre();
    const genre = responceGenre?.data?.createGenre;
    input.genresIds = [genre?.id];
  });
  afterAll(async () => {
    await removeTestBand(input.bandsIds[0]);
    await removeTestGenre(input.genresIds[0]);
    await removeTestArtist(input.artistsIds[0]);
  });

  it("creates album", async () => {
    const [data, errors] = await createTestAlbum(input);
    expect(errors).toBe(undefined);
    const id = data?.id;
    expect(id).toBeTruthy();
    input.id = id;
  });

  it("updates album", async () => {
    const updatedName = "updated";
    const updatedInput = { ...input, name: updatedName };

    const response = await sendTestRequest(
      gql`
        mutation UpdateAlbum($album: UpdateAlbumInput!) {
          updateAlbum(album: $album) {
            id
            name
            released
            artists {
              id
              firstName
              secondName
              middleName
              birthDate
              birthPlace
              country
              instruments
            }
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
            }
            genres {
              id
              name
              description
              country
              year
            }
            image
          }
        }
      `,
      { variables: { album: updatedInput }, headers: { Authorization: cachedJwt } }
    );
    const album = response?.data?.updateAlbum;
    const errors = response.errors;
    expect(errors).toBe(undefined);
    expect(album.name).toBe(updatedName);
  });

  describe("without auth", () => {
    it("gets albums", async () => {
      const response = await sendTestRequest(
        gql`
          query Albums($limit: Int, $offset: Int) {
            albums(limit: $limit, offset: $offset) {
              items {
                id
                name
                released
                artists {
                  id
                  firstName
                  secondName
                  middleName
                  birthDate
                  birthPlace
                  country
                  instruments
                }
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
                }
                genres {
                  id
                  name
                  description
                  country
                  year
                }
                image
                tracks {
                  id
                  title

                  duration
                  released
                }
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
      const items = response?.data?.albums?.items;
      const errors = response?.errors;
      expect(errors).toBe(undefined);
      expect(items).toBeTruthy();
      expect(items[0].id).toBeTruthy();
    });
    it("gets album by Id", async () => {
      const response = await sendTestRequest(
        gql`
          query Album($albumId: ID!) {
            album(id: $albumId) {
              id
              name
              released
              artists {
                id
                firstName
                secondName
                middleName
                birthDate
                birthPlace
                country
                instruments
              }
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
              }
              genres {
                id
                name
                description
                country
                year
              }
              image
            }
          }
        `,
        { variables: { albumId: input.id } }
      );
      const item = response?.data?.album;
      const errors = response.errors;
      expect(errors).toBe(undefined);
      expect(item.id).toBeTruthy();
    });
  });

  it("deletes album", async () => {
    const [data, errors] = await removeTestAlbum(input.id);
    expect(errors).toBe(undefined);
    expect(data.deletedCount).toBe(1);
  });
});
