const { User, Project } = require('../models')

const Projects = {
  // Middleware for adding Project to user's projectList
  createProject(req, res, next) {
    const { userId, id, title } = req.body
    // Create new Project instance
    const project = new Project({ id, title })
    // Find user by id
    User.findById(userId)
      .then(foundUser => {
        // Add newly created Project to user's projectList
        foundUser.projectList.push(project)
        // Save modified user to DB
        foundUser.save().then(savedUser => {
          console.log('Project successfully added.')
          res.locals.savedUser = savedUser
          next() // invoke next() to call next middleware
        })
      })
      .catch(err => {
        console.error('Error in Projects.createProject ===>', err)
        next(err)
      })
  },
  // Middleware for retrieving user's projectList
  getProjects(req, res, next) {
    const userId = req.params.userId
    User.findById(userId)
      .then(foundUser => {
        console.log('User Projects found ===>', foundUser.projectList)
        res.locals.projectList = foundUser.projectList
        next()
      })
      .catch(err => {
        console.error('Error in Projects.getProjects ===>', err)
        next(err)
      })
  },
  // Middleware for updating Project in user's projectList
  updateProject(req, res, next) {
    const { userId, id, text } = req.body
    User.findById(userId)
      .then(foundUser => {
        // Mongoose arrays have special id method for finding subdocuments
        let Project = foundUser.projectList.id(id)
        Project.text = text // update the text
        // Save modified user to DB
        foundUser.save().then(savedUser => {
          console.log('User Project updated successfully.')
          res.locals.savedUser = savedUser
          next()
        })
      })
      .catch(err => {
        console.error('Error in Projects.updateProject ===>', err)
        next(err)
      })
  },
  // Middleware for deleting Project in user's projectList
  deleteProject(req, res, next) {
    const { userId, id } = req.body
    User.findById(userId)
      .then(foundUser => {
        // Mongoose docs have built-in remove method
        foundUser.projectList.id(id).remove()
        // Save modified user to DB
        foundUser.save().then(savedUser => {
          console.log('User Project deleted successfully.')
          res.locals.savedUser = savedUser
          next()
        })
      })
      .catch(err => {
        console.error('Error in Projects.deleteProject ===>', err)
        next(err)
      })
  }
}

module.exports = Projects
