import "./styles/global.scss"
import "./styles/varios.scss"
import "./styles/bootstrap.min.css"
import { Routes, Route } from "react-router-dom";
import Home from "./paginas/home/home"
import About from "./paginas/about/about"
import CharacterDetail from "./paginas/personajeDetail/personajeDetail";
import FooterDefault from "./componentes/masters/footer/FooterDefault";
import Login from "./paginas/auth/login";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"

function App() {

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const username = 'ejemplo@ejemplo.com';
  const password = '12345678a';


  function login(userData) {
    if (userData.password === password && userData.username === username) {
      Cookies.set("logged", true);
      console.log("access: ", true);
      navigate("/");
    } else {
      //adaptado siempre login
      console.log("access: ", false);
     //Cookies.set("logged", true);
    // navigate("/");
    }
  }

  useEffect(() => {
    if (Cookies.get("logged") !== "true") {
      navigate("/auth/login");
    }
  }, [Cookies.get("logged"), navigate]);


  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="personajes/:id" element={<CharacterDetail />} />
        <Route path="auth/login" element={<Login onLogin={login} />} />
      </Routes>
      <FooterDefault />
    </>
  );
}



export default App;
