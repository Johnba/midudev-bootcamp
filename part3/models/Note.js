const { Schema, model } = require('mongoose')

// Define Schema
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

// Transformar el objeto toJSON que se devuelve en el response, para que no devuelva el _id, y el __v
// Esta funcion se ejecuta antes de devolver el objeto
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
