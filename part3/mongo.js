const mongoose = require('mongoose')
const password = require('./password.js')
const dbName = 'dbjohnba'

const connectionString = `mongodb+srv://johnbadb:${password}@cluster0.zjfdg36.mongodb.net/${dbName}?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // usecreateIndex: true
})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB: ', err.message)
  })
