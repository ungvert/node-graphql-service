import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import { cachedJwt } from "../../users/test/create-test-user.js";

export const testBand = {
  name: "Хуго-Уго",
  origin: "Тольятти",
  members: [] as {}[],
  website: "https://xygo-ygo.blogspot.com/",
  genresIds: [] as string[],
  id: undefined,
};

export async function createTestBand(band: any = testBand) {
  const response = await sendTestRequest(
    gql`
      mutation CreateBand($band: CreateBandInput!) {
        createBand(band: $band) {
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
    { variables: { band }, headers: { Authorization: cachedJwt } }
  );
  return response;
}

export async function removeTestBand(id: any) {
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
      variables: { deleteBandId: id },
      headers: { Authorization: cachedJwt },
    }
  );
  return response;
}
