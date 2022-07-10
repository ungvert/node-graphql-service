import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import { cachedJwt } from "../../users/test/create-test-user.js";

export const testArtist = {
  firstName: "Максим",
  secondName: "Котомцев",
  middleName: "Евгеньевич",
  birthDate: "15/08/1969",
  birthPlace: "Карпинск, Свердловская область, РСФСР, СССР",
  country: "Россия",
  instruments: ["вокал", "гитара"],
  bandsIds: [] as string[],
  id: undefined,
};

export async function createTestArtist(artist: any = testArtist) {
  const response = await sendTestRequest(
    gql`
      mutation CreateArtist($artist: CreateArtistInput!) {
        createArtist(artist: $artist) {
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
    { variables: { artist }, headers: { Authorization: cachedJwt } }
  );
  return response;
}

export async function removeTestArtist(id: any) {
  const response = await sendTestRequest(
    gql`
      mutation DeleteArtist($deleteArtistId: ID!) {
        deleteArtist(id: $deleteArtistId) {
          acknowledged
          deletedCount
        }
      }
    `,
    {
      variables: { deleteArtistId: id },
      headers: { Authorization: cachedJwt },
    }
  );
  return response;
}
