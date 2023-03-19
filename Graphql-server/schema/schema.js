const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Room {
    id: ID
    roomname: String
    totalmember: Int
    members: [Member]
  }
  type Member {
    id: ID!
    name: String
    position: String
    room: Room
  }

  # ROOT TYPE
  type Query {
    rooms: [Room]
    room(id: ID!): Room
    members: [Member]
    member(id: ID!): Member
  }
`;

module.exports = typeDefs;
