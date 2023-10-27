import React from "react";
import { useEffect } from "react";
import useTaskStore from "./taskStore";
import {Route, Routes} from 'react-router-dom';
import Register from "./pages/register";
import Login from "./pages/login";
import MainComponent from "./pages/mainComponent";

function App() {
  const {user} = useTaskStore();
  return(
    <>
      <Routes>
        <Route path="/" element={<MainComponent />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  )
}

export default App;
