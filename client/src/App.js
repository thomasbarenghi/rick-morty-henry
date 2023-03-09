import "./styles/global.scss"
import "./styles/varios.scss"
import "./styles/bootstrap.min.css"
import { Routes, Route } from "react-router-dom";
import Home from "./paginas/home/home"
import About from "./paginas/about/about"
import CharacterDetail from "./paginas/personajeDetail/personajeDetail";
import FooterDefault from "./componentes/masters/footer/FooterDefault";
import Login from "./paginas/auth/login";
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie"
import ScrollToTop from "./componentes/scrollToTop/scrollToTop";
import axios from "axios";

function App() {

  const navigate = useNavigate();

  const token = Cookies.get('token');

  const headers = {
    "Authorization": `Bearer ${token}`,
  };

  useEffect(() => {
    console.log(token)
    
    axios.get('http://127.0.0.1:3001/api/auth/me', { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        navigate("/auth/login");
      });
    // if (Cookies.get("token") !== "true") {
    //   navigate("/auth/login");
    // }
  }, [token, navigate]);


  
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="personajes/:id" element={<CharacterDetail />} />
        <Route path="auth/login" element={<Login/>} />
      </Routes>
      <FooterDefault />
    </>
  );
}



export default App;
