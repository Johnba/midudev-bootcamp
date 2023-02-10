import './style.css';

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

//Refactorizando notes en un componente
const Note = ({note}) => {
  console.log(notes)
  return (
    <li key={note.id}>
      <p>{note.content}</p>
      <small><time>{note.time}</time></small>
    </li>
  )
}

function App() {

  // if( typeof notes === "undefined" || notes.length === 0 ){
  //   return "No tenemos notas que mostrar"
  // }

  return (
    <div className="App">
      <h1>Notes</h1>
      <ul>
        {notes.map( notes => <Note note={notes} /> )}
      </ul>
    </div>
  );
}

export default App;
