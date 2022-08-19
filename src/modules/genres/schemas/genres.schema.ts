import { gql } from "apollo-server-core";

export const genresTypeDefs = gql`
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  type GenresWithPagination {
    items: [Genre]
    limit: Int
    offset: Int
    total: Int
  }

  type Query {
    genre(id: ID!): Genre
    genres(limit: Int, offset: Int): GenresWithPagination
  }

  type Mutation {
    createGenre(genre: CreateGenreInput!): Genre
    updateGenre(genre: UpdateGenreInput!): Genre
    deleteGenre(id: ID!): DeleteGenreResponce
  }

  input CreateGenreInput {
    name: String
    description: String
    country: String
    year: Int
  }

  input UpdateGenreInput {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  type DeleteGenreResponce {
    acknowledged: Boolean
    deletedCount: Int
  }
`;
