import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import { cachedJwt } from "../../users/test/create-test-user.js";

export const testAlbum = {
  name: "Мне так страшно",
  released: 1992,
  image: "base 64 image",
  artistsIds: [] as string[],
  bandsIds: [] as string[],
  genresIds: [] as string[],
  id: undefined,
};

export async function createTestAlbum(album: any = testAlbum) {
  const response = await sendTestRequest(
    gql`
      mutation CreateAlbum($album: CreateAlbumInput!) {
        createAlbum(album: $album) {
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
            title
            id
          }
        }
      }
    `,
    { variables: { album }, headers: { Authorization: cachedJwt } }
  );
  return [response?.data?.createAlbum, response.errors];
}

export async function removeTestAlbum(id: any) {
  const response = await sendTestRequest(
    gql`
      mutation DeleteAlbum($deleteAlbumId: ID!) {
        deleteAlbum(id: $deleteAlbumId) {
          acknowledged
          deletedCount
        }
      }
    `,
    {
      variables: { deleteAlbumId: id },
      headers: { Authorization: cachedJwt },
    }
  );
  return [response?.data?.deleteAlbum, response.errors];
}
