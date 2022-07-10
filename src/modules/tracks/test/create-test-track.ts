import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import { cachedJwt } from "../../users/test/create-test-user.js";

export const testTrack = {
  title: "Мне так страшно",
  released: 1992,
  duration: 290,
  bandsIds: [] as string[],
  genresIds: [] as string[],
  artistsIds: [] as string[],
  albumId: undefined,
  id: undefined,
};

export async function createTestTrack(track: any = testTrack) {
  const response = await sendTestRequest(
    gql`
      mutation CreateTrack($track: CreateTrackInput!) {
        createTrack(track: $track) {
          id
          title
          album {
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
          }
        }
      }
    `,
    { variables: { track }, headers: { Authorization: cachedJwt } }
  );
  return [response?.data?.createTrack, response?.errors];
}

export async function removeTestTrack(id: any) {
  const response = await sendTestRequest(
    gql`
      mutation DeleteTrack($deleteTrackId: ID!) {
        deleteTrack(id: $deleteTrackId) {
          acknowledged
          deletedCount
        }
      }
    `,
    {
      variables: { deleteTrackId: id },
      headers: { Authorization: cachedJwt },
    }
  );
  return [response?.data?.deleteTrack, response.errors];
}
