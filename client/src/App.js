import "./styles/global.scss"
import "./styles/varios.scss"
import "./styles/bootstrap.min.css"
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import axios from "axios";
import { SERVER_URL } from "./api/config";
import Home from "./paginas/home/home"
import About from "./paginas/about/about"
import CharacterDetail from "./paginas/personajeDetail/personajeDetail";
import FooterDefault from "./componentes/masters/footer/FooterDefault";
import Login from "./paginas/auth/login";
import ScrollToTop from "./componentes/scrollToTop/scrollToTop";
import { useLocation } from "react-router-dom";


function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const { token, userId } = Cookies.get();
  const headers = { "Authorization": `Bearer ${token}`, };

  useEffect(() => {
console.log("hola")
    if ((!token || !userId) || (token === "" || userId === "")) { navigate("/auth/login"); return; }
    //if (!token || !userId) { return Promise.reject(new Error('No hay token o userId en getFavorites')); }
    axios.get(`${SERVER_URL}/auth/me`, { headers })
      .then((response) => { console.log(response.data); })
      .catch((error) => { console.log("Error:", error); });

  }, [navigate, ]);


  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="personajes/:id" element={<CharacterDetail />} />
        <Route path="auth/login" element={<Login />} />
      </Routes>
      <FooterDefault />
    </>
  );
}

export default App;