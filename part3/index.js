// https://fullstackopen.com/es/part3/node_js_y_express#servidor-web-simple
// const http = require('http') //importar modulo de forma con NodeJS
// import http from 'http' //importar modulo con nuevo soporte EMCscript

// Ejecutar variables de entorno, ver archivo .env
require('dotenv').config()

// Ejecutar conexion a la base de datos, ver archivo mongo.js
require('./mongo')

// Ejemplo con Express
const express = require('express')
// const { r } = require('tar')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')
const Note = require('./models/Note') // cargamos el modelo de datos
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

app.use(cors()) // por defecto cualquier origen puede hacer peticiones, Cors no es la mejor opcion para eso se pueden usar Autenticacion por Tokens

app.use(express.json()) // https://github.com/expressjs/body-parser

app.use(logger)

//
// app.use((request, response, next) => {
//   console.log('--------- JB --------')
//   console.log('request method: ', request.method)
//   console.log('request path: ', request.path)
//   console.log('request body: ', request.body)
//   console.log('---------------------')
//   next()
// })

// let notes = [
//   {
//     id: 1,
//     content: 'HTML and JS is easy ',
//     date: '2019-05-30T17:30:31.098Z',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only Javascript',
//     date: '2019-05-30T18:39:34.091Z',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: '2019-05-30T19:20:14.298Z',
//     important: true
//   }
// ]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes)) //'Hello World'
// })

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// Buscar Nota por ID
app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id).then(note => {
    if (note) {
      return response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(err => {
    // console.log(err)
    // response.status(400).end()
    next(err) // ir al middleware de majejo de errores
  })
})

// Editar Nota por ID
app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }) // El parametro {new:true} forza a mostrar en el result el ultimo valor guardado
    .then(result => {
      // response.status(200).end()
      response.json(result)
    }).catch(err => {
      next(err)
    })
})

// Eliminar Nota por ID
app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  // Note.findByIdAndRemove(id).then(result => {
  Note.findByIdAndDelete(id).then(() => {
    response.status(204).end()
  }).catch(err => {
    next(err)
  })
})

// Guardar Nota
app.post('/api/notes', (request, response, next) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = Note({
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  })

  newNote.save().then(savedNote => {
    response.json('Nota guardada!', savedNote)
  }).catch(err => {
    // console.log(err)
    // response.status(500).end()
    next(err)
  })
})

// Middleware not found page
app.use(notFound)

// Middleware para manejar errores
app.use(handleErrors)

// const PORT = 3001 //Puerto 80 (443 para https) es el defecto de los websites
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// const PORT = 3001 // Puerto 80 (443 para https) es el defecto de los websites

// Puerto de variable de entorno 'process.env.PORT' que la pone automaticamente Heroku o el servidor
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
