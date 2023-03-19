const { rooms, members } = require("../data/static");

const resolvers = {
  Query: {
    rooms: () => rooms,
    room: (parent, args) => rooms.find((room) => room.id == args.id),
    members: () => members,
    member: (parent, args) => members.find((member) => member.id == args.id),
  },
  Member: {
    room: (parent, args) => {
      return rooms.find((room) => room.id === parent.roomId);
    },
  },

  Room: {
    members: (parent, args) => {
      return members.filter((member) => member.roomId === parent.id);
    },
  },
};

module.exports = resolvers;
