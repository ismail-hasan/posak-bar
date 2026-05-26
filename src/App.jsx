import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router'
import About from './About'
import Firstain from './Firstain'
import ScrollToTop from './Components/ScrollToTop'

function App() {

  return (

    <>
      <ScrollToTop></ScrollToTop>
      <Routes>

        <Route path="/" element={<Firstain />} />
        <Route path="/order" element={<About />} />
      </Routes>
    </>
  )
}

export default App
