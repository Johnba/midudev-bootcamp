import './App.css';
import Message from './Message';

//function App() {
const App = () => {

  //Variable
  const message1 = "Hola Mundo Variable!"

  return (
    <div className="App">
      <h1>{message1}</h1>

      <Message text="Estamos trabajando" color="red" />
      <Message text="En un curso" color="blue" />
      <Message text="De React" color="green" />

    </div>
  );
}

export default App;
