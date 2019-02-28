// Import dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Import local dependencies
const userController = require('./controllers/Users')
const projectController = require('./controllers/Projects')

// Mongoose configuration
mongoose.Promise = global.Promise // Allows use of native promises with mongoose
mongoose
  .connect(
    process.env.DB_URI, // DB URI from .env file
    { useNewUrlParser: true } // Resolves deprecation warning
  )
  .then(console.log('Connected to database.'))

// Express server configuration
const app = express() // create application instance
const HOST = process.env.HOST || 'localhost' // process.env.HOST for production, localhost for dev
const PORT = process.env.PORT || 3000

// Configure body-parser
// Only allow strings and arrays encoded in request body
app.use(bodyParser.urlencoded({ extended: false }))
// Convert request body into JSON object
app.use(bodyParser.json())

// Default route handler
app.get('/', (req, res) => res.send('Hello from Express!'))

// Register route
app.post('/register', userController.register, (req, res) => {
  res.json(res.locals.createdUser)
})

// Login route
app.post('/login', userController.login, (req, res) => {
  res.json(res.locals.foundUser)
})

// Create project route
app.post('/project', projectController.createProject, (req, res) => {
  res.json(res.locals.savedUser)
})

// Retrieve project list route
app.get('/project/:userId', projectController.getProjects, (req, res) => {
  res.json(res.locals.projectList)
})

// Update project route
app.put('/project', projectController.updateProject, (req, res) => {
  res.json(res.locals.savedUser)
})

// Delete project route
app.delete('/project', projectController.deleteProject, (req, res) => {
  res.json(res.locals.savedUser)
})

// Error handling middleware
app.use((err, req, res, next) => {
  res.error('Internal Server Error ===>', err)
  res.status(500).send('Internal Server Error')
})

// Start server
app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}`))
