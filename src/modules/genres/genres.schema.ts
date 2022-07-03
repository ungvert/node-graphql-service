import { gql } from "apollo-server-core";

export const genresTypeDefs = gql`
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  type Query {
    genre(id: ID!): Genre
    genres: [Genre]
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
