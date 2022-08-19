import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  cachedJwt,
  loginTestUser,
  registerTestUser,
} from "../../users/test/create-test-user";
import { createTestGenre, removeTestGenre } from "../../genres/test/create-test-genre.js";
import { createTestBand, removeTestBand } from "../../bands/test/create-test-band.js";
import { createTestTrack, removeTestTrack, testTrack } from "./create-test-track.js";
import {
  createTestArtist,
  removeTestArtist,
} from "../../artists/test/create-test-artist.js";
import { createTestAlbum, removeTestAlbum } from "../../albums/test/create-test-album.js";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import { gql } from "apollo-server-express";

describe("Tracks module", () => {
  let input = { ...testTrack };
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

    const [album] = await createTestAlbum();
    input.albumId = album.id;
  });
  afterAll(async () => {
    await removeTestBand(input.bandsIds[0]);
    await removeTestGenre(input.genresIds[0]);
    await removeTestArtist(input.artistsIds[0]);
    await removeTestAlbum(input.albumId);
  });

  it("creates track", async () => {
    const [data, errors] = await createTestTrack(input);
    expect(errors).toBe(undefined);
    const id = data?.id;
    expect(id).toBeTruthy();
    input.id = id;
  });

  it("updates track", async () => {
    const updatedTitle = "updated";
    const updatedInput = { ...input, title: updatedTitle };

    const response = await sendTestRequest(
      gql`
        mutation UpdateTrack($track: UpdateTrackInput!) {
          updateTrack(track: $track) {
            id
            title
            album {
              id
              name
              released
              tracks {
                id
                title
                duration
                released
              }
              image
            }
            bands {
              id
              name
              origin
              members {
                artist {
                  id
                  firstName
                  secondName
                  middleName
                  birthDate
                  birthPlace
                  country
                  instruments
                }
                instrument
                years
              }
              website
            }
            duration
            released
            genres {
              id
              name
              description
              country
              year
            }
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
          }
        }
      `,
      { variables: { track: updatedInput }, headers: { Authorization: cachedJwt } }
    );
    const track = response?.data?.updateTrack;
    const errors = response.errors;
    expect(errors).toBe(undefined);
    expect(track.title).toBe(updatedTitle);
  });

  describe("without auth", () => {
    it("gets tracks", async () => {
      const response = await sendTestRequest(
        gql`
          query Tracks($limit: Int, $offset: Int) {
            tracks(limit: $limit, offset: $offset) {
              limit
              offset
              total
              items {
                id
                title
                album {
                  id
                  name
                  released
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
                duration
                released
                genres {
                  id
                  name
                  description
                  country
                  year
                }
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
              }
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
      const items = response?.data?.tracks?.items;
      const errors = response?.errors;
      expect(errors).toBe(undefined);
      expect(items).toBeTruthy();
      expect(items[0].id).toBeTruthy();
    });
    it("gets track by Id", async () => {
      const response = await sendTestRequest(
        gql`
          query Track($trackId: ID!) {
            track(id: $trackId) {
              id
              title
              album {
                id
                name
                released
                tracks {
                  id
                  title
                  duration
                  released
                }
                image
              }
              bands {
                id
                name
                origin
                members {
                  artist {
                    id
                    firstName
                    secondName
                    middleName
                    birthDate
                    birthPlace
                    country
                    instruments
                  }
                  instrument
                  years
                }
                website
              }
              duration
              released
              genres {
                id
                name
                description
                country
                year
              }
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
            }
          }
        `,
        { variables: { trackId: input.id } }
      );
      const item = response?.data?.track;
      const errors = response.errors;
      expect(errors).toBe(undefined);
      expect(item.id).toBeTruthy();
    });
  });

  it("deletes track", async () => {
    const [data, errors] = await removeTestTrack(input.id);
    expect(errors).toBe(undefined);
    expect(data.deletedCount).toBe(1);
  });
});
