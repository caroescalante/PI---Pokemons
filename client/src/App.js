import './App.css';
import { Landing, Home, Form, Details } from './views';
import { Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';


function App() {
  const location= useLocation()
  return (
    <div className="App">

    {location.pathname !== "/" && <NavBar/>}
    
    <Route exact path='/' render={()=> <Landing />} />

    <Route path="/detail/:id" render={()=> <Details />} />

    <Route path="/home" render={()=> <Home />} />

    <Route path='/create' render={()=> <Form />} />


  </div>
  );
}

export default App;
