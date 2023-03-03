import React from 'react'
import { Routes, Route, Navigate} from "react-router-dom";
import App from './App';
import Details from './componen/Details';

export default function Routers() {
  return (
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="*" element={ <Navigate to="/" /> } />
        <Route path="/details" element={<Details/>}/>
      </Routes> 
        
  )
}
