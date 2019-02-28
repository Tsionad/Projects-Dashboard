// Import dependencies
require('dotenv').config()
const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const path = require('path')

// Import local dependencies
const schema = require('./graphql-schema')

// Mongoose configuration
mongoose.Promise = global.Promise // Allows use of native promises with mongoose
mongoose
  .connect(
    process.env.DB_URI, // DB URI from .env file
    { useNewUrlParser: true } // Resolves deprecation warning
  )
  .then(console.log('Connected to database.'))
// const MongoDB = process.env.MONGO_URI || 'mongodb://localhost/graphql';

// Express server configuration
const app = express()
// process.env.HOST for production || localhost for dev
const HOST = process.env.HOST || 'mongodb://localhost/graphql'
const PORT = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, '../public')))

// Route handler
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false //Set to true to view GraphiQl in browser at /graphql
  })
)

// Error handling middleware
app.use((err, req, res, next) => {
  res.error('Internal Server Error ===>', err)
  res.status(500).send('Internal Server Error')
})

// Start server
app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}:${PORT}`))
