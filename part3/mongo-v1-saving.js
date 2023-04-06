const mongoose = require('mongoose')
const password = require('./password.js')
const { model, Schema } = require('mongoose')
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

// test with: node mongo.js

// 1. Define Schema
// Ojo el schema se define aqui en el app, pero en el servidor tambien se puede definir, hay que tenerlas iguales
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

// 2. Define Model
// Crear modelo basado en el schema anterior
const Note = mongoose.model('Note', noteSchema) // Nombre del modelo en singular

// El modelo tambien permite buscar datos ejemplo:
// Note.find({ important: true })
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })

// 3. Create a new note
const note = new Note({
  content: 'MongoDB es increible, johnba',
  date: new Date(),
  important: true
})

// 4. Save note to database
note.save()
  .then(result => { // Antes se trabajaba con callbacks, ahora con promesas
    console.log('note saved!')
    console.log(result) // el resultado devuelve el objeto que se guardo en la base de datos

    // 5. Close mongoose connection
    mongoose.connection.close()
    console.log('connection closed!')
  })
  .catch(err => {
    console.log(err)
  })
