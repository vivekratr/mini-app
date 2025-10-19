import {  useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />

        
     

          
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
