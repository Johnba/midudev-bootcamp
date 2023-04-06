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

let notes = []

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

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  // console.log({id})
  notes = notes.filter(note => note.id !== id)
  // console.log({note})
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]
  // notes = notes.concat(newNote)

  response.status(201).json(newNote)

  // console.log(note)
  // response.json(note)
})

// Si no se encuentra la ruta mostrar error 404
app.use((request, response) => {
  // Aqui se puede hacer un log de errores
  // console.log(response.path)

  response.status(404).json({
    error: 'Not found'
  })
})

// const PORT = 3001 //Puerto 80 (443 para https) es el defecto de los websites
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// const PORT = 3001 // Puerto 80 (443 para https) es el defecto de los websites

// Puerto de variable de entorno 'process.env.PORT' que la pone automaticamente Heroku o el servidor
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
