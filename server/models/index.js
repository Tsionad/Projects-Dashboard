const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema defining a User model
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  projectList: [ProjectSchema]
})

/*
  No ID necessary because Mongoose will assign
  an ID by default to all schemas
*/

const ProjectSchema = new Schema({
  title: String,
  author: String,
  created_at: Date,
  updated_at: Date
})

const User = mongoose.model('User', UserSchema)
const Project = mongoose.model('Project', ProjectSchema)

module.exports = { User, Project }
