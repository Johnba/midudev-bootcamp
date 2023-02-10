import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'

import {useState} from 'react';


const App = (props) => {
  const [left, setLeft] = useState(10)
  const [right, setRight] = useState(10)

  console.log('render!!')

  return (
    <div>
      {left}
      <button onClick={ () => setLeft(left +1) }>Left</button>
      <button onClick={ () => setRight(right +1) }>Right</button>
      {right}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

