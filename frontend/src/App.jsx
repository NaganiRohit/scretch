import React from 'react'
import Index from './pages/Index'
import Shop from './pages/Shop'
import { Route, Routes } from "react-router-dom"
import CreateProduct from './pages/CreateProduct'


function App() {
  
  return (
    <div>
      <Routes>
      <Route path="/" element={<Index/>}  />
      <Route path="/Shop" element={<Shop/>}  />
      <Route path="/createproduct" element={<CreateProduct/>}/>
      </Routes>
    </div>
  )
}

export default App
