const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLSchema } = graphql;
const User = require('./raceModel');
const { sortAscending } = require('../../common/sort');

const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    name: { type: GraphQLString },
    color: { type: GraphQLString },
    speed: { type: GraphQLInt },
    time: { type: GraphQLFloat }
  }),
  async resolve(parent, args) {
    const page = parent.page ? parent.page : 0;
    const count = parent.count ? parent.count : 50;
    const skip = page * count;
    const unlimited = parent.unlimited;
    const users = unlimited ? await User.find({}) : await User.find({}).skip(skip).limit(count);
    return sortAscending(users, 'time');
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UsersType),
      args: {
        page: { type: GraphQLInt },
        count: { type: GraphQLInt },
        unlimited: { type: GraphQLBoolean }
      },
      async resolve(parent, args) {
        const page = args.page ? args.page : 0;
        const count = args.count ? args.count : 50;
        const skip = page * count;
        const unlimited = args.unlimited;
        const users = unlimited ? await User.find({}) : await User.find({}).skip(skip).limit(count);
        return sortAscending(users, 'time');
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query
});