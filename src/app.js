import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Navbar from './Components/Navbar';
import NoteState from './Context/notes/NoteState'; // Ensure the path is correct
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';



function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) =>{
    setAlert({
      message: message,
      type: type
    });
    
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  // console.log("showAlert in app:", showAlert); // Debugging props  
  return (
    <div>
      <NoteState>
    <Navbar/>
    <Alert alert={alert}/>
      <div className= " m-3">
      <Routes>
      <Route exact path='/' element={<Home showAlert={showAlert}/>} ></Route>
      <Route exact path='/Home' element={<Home/>}></Route>
      <Route exact path='/About' element={<About/>}></Route>
      <Route exact path='/Login' element={<Login alert={showAlert}/>}></Route>
      <Route exact path='/Signup' element={<Signup alert={showAlert}/>}></Route>
      </Routes>
      </div>
      </NoteState>
    </div>
  );
}

export default App;
