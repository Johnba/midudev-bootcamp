const mongoose = require('mongoose')
const password = require('./password.js')

const connectionString = `mongodb+srv://johnbadb:${password}@cluster0.zjfdg36.mongodb.net/?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB: ', err.message)
  })

// test with: node mongo.js
