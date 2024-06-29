import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import Navbar from './components/UI/Navbar/Navbar.jsx'
import AppRouter from './components/AppRouter.jsx'
import "./styles/App.css"

function App(inputValue) {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
