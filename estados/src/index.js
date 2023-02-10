import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'

import {useState} from 'react';

//Crear componente warning
const WarningNotUsed = () => {
  return <h1>Todavia no se ha usado el componente</h1>
}

//Crear componente para listar los clicks hechos
const ListOfClicks = ({clicks}) => {
  
  console.log({clicks})
  //debugger

  return <p>Clicks: {clicks.join(', ')} </p>
}

const INITIAL_COUNTER_STATE = {
    left: 0,
    right: 0,
    message: 'Mensaje en el estado'
}



const App = (props) => {
  // const [left, setLeft] = useState(10)
  // const [right, setRight] = useState(10)

  const [counters, setCounters] = useState(INITIAL_COUNTER_STATE)

  const [clicks, setClicks] = useState([]) //Estado con arreglo

  const handleClickLeft = (event) => {
    event.preventDefault()

    const newCountersState = {
      ...counters, //spread operator
      left: counters.left + 1,
    }

    setCounters(newCountersState)
    setClicks((prevClicks) => [...prevClicks, "L"])
  }

  const handleClickRight = (event) => {
    event.preventDefault()

    setCounters({
      ...counters, //spread operator
      right: counters.right +1, 
    })

    setClicks((prevClicks) => [...prevClicks, "R"])
  }

  const handleReset = () => {
    setCounters(INITIAL_COUNTER_STATE)
    setClicks([])
  }

  console.log('render!!')

  return (
    <div>
      {counters.left}
      <button onClick={ handleClickLeft }>Left</button>
      <button onClick={ handleClickRight }>Right</button>
      {counters.right}


      <p>
        <button onClick={handleReset} >Reset counter</button>
      </p>

      <p>Total clicks: {clicks.length}</p>

      {clicks.length === 0 
        ? <WarningNotUsed/>
        : <ListOfClicks clicks={clicks} />
      }

    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

