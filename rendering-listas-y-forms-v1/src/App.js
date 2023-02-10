import './style.css';
import { useState } from 'react';
import { Note } from './Note';

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     date: '2019-05-30T17:30:31.098Z',
//     important: true,
//     categories: ['categ1', 'categ2', 'categ3']
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     date: '2019-05-30T18:39:34.091Z',
//     important: false,
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: '2019-05-30T19:20:14.298Z',
//     important: true,
//   },
// ]

function App(props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  // if( typeof notes === "undefined" || notes.length === 0 ){
  //   return "No tenemos notas que mostrar"
  // }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value) //Guardar valor de nota en el estado
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log("Crear nota")
    console.log(newNote)

    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5 //Math.random() retorna un valor entre 0 y 1
    }

    //Superimportante: cada vez que queramos actualizar el estado debemos crear un nuevo array para no sobreescribir el mismo
    //ejemplo:  notes.concat(nuevoElemento)

    console.log(noteToAddToState)

    //Forma 1 concatenando
    //setNotes( notes.concat(noteToAddToState) ) //esto crea un array nuevo
    //setNotes( notes.push(noteToAddToState) ) //OJO esto NO crea un array nuevo, aqui estariamo modificando el mismo array
    
    //Forma 2 con spread operator
    setNotes (  [...notes, noteToAddToState] ) //esto crea un array nuevo

    //Limpiar el input
    setNewNote("")

    // {
    //   id: 3,
    //   content: 'GET and POST are the most important methods of HTTP protocol',
    //   date: '2019-05-30T19:20:14.298Z',
    //   important: true,
    // }
  }

  const handleShowAll = () => {
    setShowAll( () => !showAll )
  }

  return (
    <div className="App">
      <h1>Notes</h1>

      <button onClick={handleShowAll}>{
        showAll ? "Show only important" : "Show All"
      }</button>

      <ul>
        {notes.filter( (note) => {
          if( showAll === true ) return note;
          return note.important === true
        })        
        .map( (note) => (
            <Note key={note.id} {...note} /> 
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} /> { /*Importante conservar el valor actual del estado newNote*/ }
        <button>Crear nota</button>
      </form>
      
    </div>
  );
}

export default App;
