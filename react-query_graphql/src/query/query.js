import { gql } from "@apollo/client";

export const GetRoomsData = gql`
  query Query {
    rooms {
      id
      roomname
      totalmember
    }
  }
`;

export const GetRoomById = gql`
  query Query($roomId: ID!) {
    room(id: $roomId) {
      id
      roomname
      totalmember
    }
  }
`;

export const GetMembersData = gql`
  query Query {
    members {
      id
      name
      position
    }
  }
`;

export const GetMemberById = gql`
  query Query($memberId: ID!) {
    member(id: $memberId) {
      id
      name
      position
    }
  }
`;
