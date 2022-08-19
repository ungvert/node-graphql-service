import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import {
  cachedJwt,
  loginTestUser,
  registerTestUser,
} from "../../users/test/create-test-user";
import { createTestGenre, removeTestGenre } from "../../genres/test/create-test-genre.js";
import { createTestBand, removeTestBand } from "../../bands/test/create-test-band.js";
import {
  createTestArtist,
  removeTestArtist,
} from "../../artists/test/create-test-artist.js";
import { createTestTrack, removeTestTrack } from "../../tracks/test/create-test-track.js";

describe("Favourites module", () => {
  let input = {
    bandId: undefined,
    genreId: undefined,
    artistId: undefined,
    trackId: undefined,
  };
  beforeAll(async () => {
    if (!cachedJwt) {
      await registerTestUser();
      await loginTestUser();
    }

    const responseBand = await createTestBand();
    const band = responseBand?.data?.createBand;
    input.bandId = band?.id;

    const artistResponce = await createTestArtist();
    const artist = artistResponce?.data?.createArtist;
    input.artistId = artist?.id;

    const responceGenre = await createTestGenre();
    const genre = responceGenre?.data?.createGenre;
    input.genreId = genre?.id;

    const [track] = await createTestTrack();
    input.trackId = track?.id;
  });
  afterAll(async () => {
    await removeTestBand(input.bandId);
    await removeTestGenre(input.genreId);
    await removeTestArtist(input.artistId);
    await removeTestTrack(input.trackId);
  });

  it("adds track,band,genre,artist to favourites", async () => {
    const response = await sendTestRequest(
      gql`
        mutation AddTrackToFavourites(
          $addTrackToFavouritesId: ID!
          $addArtistToFavouritesId: ID!
          $addBandToFavouritesId: ID!
          $addGenreToFavouritesId: ID!
        ) {
          addTrackToFavourites(id: $addTrackToFavouritesId) {
            tracks {
              id
            }
          }
          addArtistToFavourites(id: $addArtistToFavouritesId) {
            artists {
              id
            }
          }
          addBandToFavourites(id: $addBandToFavouritesId) {
            bands {
              id
            }
          }
          addGenreToFavourites(id: $addGenreToFavouritesId) {
            genres {
              id
            }
          }
        }
      `,
      {
        variables: {
          addTrackToFavouritesId: input.trackId,
          addArtistToFavouritesId: input.artistId,
          addBandToFavouritesId: input.bandId,
          addGenreToFavouritesId: input.genreId,
        },
        headers: { Authorization: cachedJwt },
      }
    );

    expect(response.errors).toBe(undefined);
    expect(response?.data?.addTrackToFavourites?.tracks).toStrictEqual([
      { id: input.trackId },
    ]);
    expect(response?.data?.addArtistToFavourites?.artists).toStrictEqual([
      { id: input.artistId },
    ]);
    expect(response?.data?.addBandToFavourites?.bands).toStrictEqual([
      { id: input.bandId },
    ]);
    expect(response?.data?.addGenreToFavourites?.genres).toStrictEqual([
      { id: input.genreId },
    ]);
  });

  it("queries users favourites", async () => {
    const response = await sendTestRequest(
      gql`
        query Favourites {
          favourites {
            id
            userId
            bands {
              id
            }
            genres {
              id
            }
            artists {
              id
            }
            tracks {
              id
            }
          }
        }
      `,
      {
        headers: { Authorization: cachedJwt },
      }
    );

    expect(response.errors).toBe(undefined);
    expect(response?.data?.favourites?.tracks).toStrictEqual([{ id: input.trackId }]);
    expect(response?.data?.favourites?.artists).toStrictEqual([{ id: input.artistId }]);
    expect(response?.data?.favourites?.bands).toStrictEqual([{ id: input.bandId }]);
    expect(response?.data?.favourites?.genres).toStrictEqual([{ id: input.genreId }]);
  });

  it("removes track,band,genre,artist from favourites", async () => {
    const response = await sendTestRequest(
      gql`
        mutation RemoveTrackFromFavourites(
          $removeTrackFromFavouritesId: ID!
          $removeArtistFromFavouritesId: ID!
          $removeBandFromFavouritesId: ID!
          $removeGenreFromFavouritesId: ID!
        ) {
          removeTrackFromFavourites(id: $removeTrackFromFavouritesId) {
            tracks {
              id
            }
          }
          removeArtistFromFavourites(id: $removeArtistFromFavouritesId) {
            artists {
              id
            }
          }
          removeBandFromFavourites(id: $removeBandFromFavouritesId) {
            bands {
              id
            }
          }
          removeGenreFromFavourites(id: $removeGenreFromFavouritesId) {
            genres {
              id
            }
          }
        }
      `,
      {
        variables: {
          removeTrackFromFavouritesId: input.trackId,
          removeArtistFromFavouritesId: input.artistId,
          removeBandFromFavouritesId: input.bandId,
          removeGenreFromFavouritesId: input.genreId,
        },
        headers: { Authorization: cachedJwt },
      }
    );

    expect(response.errors).toBe(undefined);
    expect(response?.data?.removeTraFromToFavourites?.tracks).toBe(undefined);
    expect(response?.data?.removeArtiFromToFavourites?.artists).toBe(undefined);
    expect(response?.data?.removeBaFromToFavourites?.bands).toBe(undefined);
    expect(response?.data?.removeGenFromToFavourites?.genres).toBe(undefined);
  });
});
