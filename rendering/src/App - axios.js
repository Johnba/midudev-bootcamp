import './style.css';
import { useEffect, useState } from 'react';
import { Note } from './Note';
import axios from 'axios';


function App() {
  const [notes, setNotes] = useState([]) //inicializar el estado con []
  const [newNote, setNewNote] = useState("")
  const [loading, setLoading] = useState(false)

  //useEffect es un hook se se ejecuta cada vez que se renderiza un componente, segun sus dependencias
  //useEffect se ejecuta cuando queramos
  useEffect(() => {
    console.log("useEffect")

    setLoading(true)

    //setTimeout(() => {
      console.log("ahora!")

      //Metodo fetch para recuperar datos desde una url
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          //console.log(json)
          console.log("seteando las notas de la API")
          const {data} = response;
          setNotes(data)
          setLoading(false)
      });

    //}, 2000); //<- 2 espere segundos

  }, []) //<- aqui van las dependencias ejem: newNote

  // //Metodo fetch para recuperar datos desde una url
  // //Aqui lo hace de forma asincrona
  // fetch('https://jsonplaceholder.typicode.com/posts')
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log(json)
  //   })


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
      title: newNote,
      body: newNote
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

  }

  return (
    <div className="App">
      <h1>Notes</h1>
      
      { loading ? "Cargando data..." : "" }

      <ol>
        {notes
          .map( (note) => (
            <Note key={note.id} {...note} /> 
        ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} /> { /*Importante conservar el valor actual del estado newNote*/ }
        <button>Crear nota</button>
      </form>
      
    </div>
  );
}

export default App;
