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



function App() {

  const navigate = useNavigate();
  const token = Cookies.get('token');
  const userId = Cookies.get('userId');

  const headers = { "Authorization": `Bearer ${token}`, };

  useEffect(() => {

    if ((!token || !userId) || (token === "" || userId === "")) { navigate("/auth/login"); return; }

    axios.get(`${SERVER_URL}/auth/me`, { headers })
      .then((response) => { console.log(response.data); })
      .catch((error) => { console.log("Error:", error); });

  }, [token, userId]);


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