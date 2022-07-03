import { gql } from "apollo-server-core";

export const albumsTypeDefs = gql`
  type Album {
    id: ID!
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    # tracks: [Track]
    genres: [Genre]
    image: String
  }

  type AlbumsWithPagination {
    items: [Album]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    album(id: ID!): Album
    albums(limit: Int, offset: Int): AlbumsWithPagination
  }

  type Mutation {
    createAlbum(album: CreateAlbumInput!): Album
    updateAlbum(album: UpdateAlbumInput!): Album
    deleteAlbum(id: ID!): DeleteAlbumResponce
  }

  input CreateAlbumInput {
    name: String
    released: Int
    artistsIds: [ID!]
    bandsIds: [ID!]
    tracksIds: [ID!]
    genresIds: [ID!]
    image: String
  }

  input UpdateAlbumInput {
    id: ID!
    name: String
    released: Int
    artistsIds: [ID!]
    bandsIds: [ID!]
    tracksIds: [ID!]
    genresIds: [ID!]
    image: String
  }

  type DeleteAlbumResponce {
    acknowledged: Boolean
    deletedCount: Int
  }
`;
