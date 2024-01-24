import React from 'react';
import './App.css';
import Form from './components/Form';
import { Cards } from './components/Cards';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
       <Form/>
       <div className='right-container'> 
          <Navbar/>
          <Cards/>
       </div>
    </div>

  );
}

export default App;
