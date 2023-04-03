// https://fullstackopen.com/es/part3/node_js_y_express#servidor-web-simple
// const http = require('http') //importar modulo de forma con NodeJS
// import http from 'http' //importar modulo con nuevo soporte EMCscript

// Ejemplo co Express
const express = require('express')
// const { r } = require('tar')
const app = express()

app.use(express.json()) // https://github.com/expressjs/body-parser

let notes = [
  {
    id: 1,
    content: 'HTML and JS is easy ',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes)) //'Hello World'
// })

app.get('/api/notes', (request, response) => {
  response.json(notes)
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

// const PORT = 3001 //Puerto 80 (443 para https) es el defecto de los websites
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

const PORT = 3001 // Puerto 80 (443 para https) es el defecto de los websites
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
