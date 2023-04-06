const mongoose = require('mongoose')
// const password = require('./password.js')
// const dbName = 'dbjohnba'

// const connectionString = `mongodb+srv://johnbadb:${password}@cluster0.zjfdg36.mongodb.net/${dbName}?retryWrites=true&w=majority`

// Inicializar variables de entorno
const connectionString = process.env.MONGO_DB_URI

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

// en caso de algun error de conexion, se ejecuta este codigo
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception. Shutting down...')
  console.log(err.name, err.message)
  // process.exit(1)
  mongoose.connection.disconnect()
})
