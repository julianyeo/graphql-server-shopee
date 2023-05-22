const typeDef = `#graphql
  input SignupInput {
    name: String
    email: String
    password: String
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type UserOutput {
    _id: ID
    name: String
    email: String
    password: String
  }
  type User {
    name: String
    email: String
    password: String
  }
  type Query {
  getUser(id: ID!): User
}
     type Mutation {
    loginUser(input: LoginInput): UserOutput
    addUser(input: SignupInput): UserOutput
  }
`;
export default typeDef;
