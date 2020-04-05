const { gql } = require("apollo-server");

const { Date } = require("./scalars/index");

module.exports = gql`
  scalar Date
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: Date!
  }
  type RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
