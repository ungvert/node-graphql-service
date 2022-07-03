import { gql } from "apollo-server-core";

export const tracksTypeDefs = gql`
  type Track {
    id: ID!
    title: String!
    album: Album
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
    artists: [Artist]
  }

  type TracksWithPagination {
    items: [Track]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    track(id: ID!): Track
    tracks(limit: Int, offset: Int): TracksWithPagination
  }

  type Mutation {
    createTrack(track: CreateTrackInput!): Track
    updateTrack(track: UpdateTrackInput!): Track
    deleteTrack(id: ID!): DeleteTrackResponce
  }

  input CreateTrackInput {
    title: String!
    albumId: ID
    bandsIds: [ID!]
    duration: Int
    released: Int
    genresIds: [ID!]
    artistsIds: [ID!]
  }

  input UpdateTrackInput {
    id: ID!
    title: String!
    albumId: ID
    bandsIds: [ID!]
    duration: Int
    released: Int
    genresIds: [ID!]
    artistsIds: [ID!]
  }

  type DeleteTrackResponce {
    acknowledged: Boolean
    deletedCount: Int
  }
`;
