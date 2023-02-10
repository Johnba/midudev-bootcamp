import './style.css';
import { useEffect, useState } from 'react';
import { Note } from './Note';
//import axios from 'axios';

//Ejemplo de importar servicios separados:
// import { getAllNotes } from './services/notes/getAllNotes';
// import { createNote } from './services/notes/createNote';

//Ejemplo de importar servicios en uno solo:
import { getAllTheNotes as getAllNotes, createTheNote as createNote } from './services/notes';



function App() {
  const [notes, setNotes] = useState([]) //inicializar el estado con []
  const [newNote, setNewNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('') //estado para mosrar errores

  //useEffect es un hook se se ejecuta cada vez que se renderiza un componente, segun sus dependencias
  //useEffect se ejecuta cuando queramos
  useEffect(() => {
    console.log("useEffect")

    setLoading(true)

    getAllNotes()
      .then(notes => {
          setNotes(notes)
          setLoading(false)
      })

    // ESTO SE LLEVA A services/notes/getAllNotes.js
    // //setTimeout(() => {
    //   console.log("ahora!")
    //   //Metodo fetch para recuperar datos desde una url
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/posts')
    //     .then(response => {
    //       //console.log(json)
    //       console.log("seteando las notas de la API")
    //       const {data} = response;
    //       setNotes(data)
    //       setLoading(false)
    //   });
    // //}, 2000); //<- 2 espere segundos

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
    //console.log(newNote)

    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    }
    
    setError()

    createNote(noteToAddToState)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote))
      })
      .catch((error) => {
        //Capturar y manejar el error
        console.error(error)
        setError('La API ha generado un error :(')
      })

    // //https://github.com/axios/axios
    // axios
    // .post('https://jsonplaceholder.typicode.com/posts', noteToAddToState)
    // .then((response) => {
    //   const {data} = response;
    //   setNotes((prevNotes) => prevNotes.concat(data))
    // });

    console.log(noteToAddToState)
    
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
      
      { error ? <span style={{color:"red"}}>{error}</span> : ""}

    </div>
  );
}

export default App;
