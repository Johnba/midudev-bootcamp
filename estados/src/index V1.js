import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';

import {useState} from 'react';


//const Counter = ( props => {
const Counter = ({number}) => {

    console.log("Counter Render!!!")
    return <h1>{number}</h1>

}


const App = (props) => {
  //Capturando valores de useState sin desestructuracion
  // const contador = useState(10)
  // const contadorValue = contador[0]
  // const setContador = contador[1]

  //Desectructurando valores de useState()
  //const [state, setState] = useState(10)
  const [contadorValue, setContador] = useState(10)

  // setInterval( ()=>{
  //   setContador(contadorValue + 1)
  // }, 2000 );

  console.log('render!!')

  //Funciones o utilidades dentro de un componente:
  const handleClick = () => {
    console.log('click!')
        
    //Esta funcion es un ejemplo de como se actualizar el valor del contador 
    // enviando como parametro el valor anterior a la funcion
    //
    // setContador( (prevContador) => {
    //   return prevContador + 1
    // } )

    //Otra forma de hacerlo:
    setContador (prevContador => prevContador + 1) //Esta opcion es mas recomendable para asegurarnos que tenemos el valor anterior

    //Esta linea hace lo mismo que la funcion anterior pero mas corta
    // setContador( contadorValue+1 )
  }

  const handleClickReset = () => {
    setContador(0)
  }

  const isEven = contadorValue % 2 === 0
  const mensajePar = isEven ? 'Es par' : 'Es impar'

  return (
    <div>
      <p>El valor del contador es:</p>

      <Counter number={contadorValue} />

      <p>{mensajePar}</p>

      <button onClick={

          handleClick //Definir funcion de ayuda para este evento onclick, Importante no ejecutar funcion con () 

          // Funcion dentro del evento onClick
          //() => {
            //console.log('click!')
            
            //Forma standard de actualizar el estado
            //setContador( contadorValue+1 )

            //Otra forma de actualizar el estado con una funcion que tiene el valor anterior
            // setContador( contadorPreviousValue = ()=>{
            //   return contadorPreviousValue + 1
            // })
          //}
        }>Incrementar</button>

      <button onClick={handleClickReset}>Reset Counter</button>

    </div>
  )


}

let contador = 1

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

