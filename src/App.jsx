import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router'
import About from './About'
import Firstain from './Firstain'

function App() {

  return (

    <Routes>
      <Route path="/" element={<Firstain />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
