import { gql } from "apollo-server-core";

export const artistsTypeDefs = gql`
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: [String]
  }

  type ArtistsWithPagination {
    items: [Artist]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    artist(id: ID!): Artist
    artists(limit: Int, offset: Int): ArtistsWithPagination
  }

  type Mutation {
    createArtist(artist: CreateArtistInput!): Artist
    updateArtist(artist: UpdateArtistInput!): Artist
    deleteArtist(id: ID!): DeleteArtistResponce
  }

  input CreateArtistInput {
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bandsIds: [ID!]
    instruments: [String]
  }

  input UpdateArtistInput {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bandsIds: [ID!]
    instruments: [String]
  }

  type DeleteArtistResponce {
    acknowledged: Boolean
    deletedCount: Int
  }
`;
