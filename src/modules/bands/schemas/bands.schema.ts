import { gql } from "apollo-server-core";

export const bandsTypeDefs = gql`
  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type Member {
    artist: Artist
    instrument: String
    years: [String]
  }

  type BandsWithPagination {
    items: [Band]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    band(id: ID!): Band
    bands(limit: Int, offset: Int): BandsWithPagination
  }

  type Mutation {
    createBand(band: CreateBandInput!): Band
    updateBand(band: UpdateBandInput!): Band
    deleteBand(id: ID!): DeleteBandResponce
  }

  input CreateBandInput {
    name: String!
    origin: String!
    members: [MemberInput!]!
    website: String!
    genresIds: [ID!]
  }

  input UpdateBandInput {
    id: ID!
    name: String!
    origin: String!
    members: [MemberInput!]!
    website: String!
    genresIds: [ID!]
  }

  input MemberInput {
    artist: ID!
    instrument: String!
    years: [String!]!
  }

  type DeleteBandResponce {
    acknowledged: Boolean
    deletedCount: Int
  }
`;
