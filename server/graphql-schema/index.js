const graphql = require('graphql')
const Project = require('../models')

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    created: { type: GraphQLInt },
    updated: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    everyProject: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find({})
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Project.findById(args.id)
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        created: { type: GraphQLInt },
        updated: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const project = new Project(args)
        return project.save()
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        created: { type: GraphQLInt },
        updated: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(args.id, args)
      }
    },
    deleteproject: {
      type: ProjectType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
