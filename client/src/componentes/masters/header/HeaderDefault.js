import style from "./header.module.scss";
import { useEffect, useState } from "react";
import SearchModal from "../../searchModal/SearchModal";
import { changeFilter } from "../../../redux/actions/general";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export default function HeaderDefault({ handleFilter, searchStatus }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [headerType, setHeaderType] = useState("default");
  const [searchModalStatus, setSearchModalStatus] = useState(false);
  const [hamburguerStatus, setHamburguerStatus] = useState(false);

  const handleSearch = (dato) => {
   // console.log(dato.target.name)
    const obj = {
      [dato.target.name]: dato.target.value,
    };
    dispatch(changeFilter(obj));
  };

  useEffect(() => {
    const handleScroll = () => {
      // console.log(headerType)
      if (window.scrollY > 100) {
        setHeaderType("alternative");
      } else {
        setHeaderType("default");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchModal = () => {
    setSearchModalStatus(!searchModalStatus);
  };

  const handleLogout = () => {
   // console.log("logout")
    Cookies.remove("token");
    navigate("/auth/login");
  };


  return (
    <>
      <header
        id={style.header}
        className="d-flex flex-row justify-content-between align-items-center padding-lr-t1 padding-tb-30 margin-b-0"
        style={headerType === "alternative" ? { background: "rgba(55,156,53,0.2)" } : {}}
      >
        <Link to="/">
          <img
            id={style["header-logo"]}
            src="/img/Rectangle 1.svg"
            width={213}
            height={40}
            zindex={5}
            alt="logo"
          />
        </Link>

        

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Nav searchStatus={searchStatus} handleLogout={handleLogout} headerType={headerType} />
          {searchStatus === true && (
            <SearchBar handleSearch={handleSearch} handleSearchModal={handleSearchModal} />
          )}

          <div id={style.openSearchBtn}
             onClick={() => setHamburguerStatus(true)}
             name="hamburguer"
            className="d-xl-none d-xxl-none"
            style={{ width: "52px", height: "52px", display: "flex", justifyContent: "center", alignItems: "center" }} >
           
            <img
              className="d-inline d-sm-inline d-md-inline d-lg-inline d-xl-none d-xxl-none"
              src="/img/hamburger2.svg"
              alt="hamburguer"
              width={20}
              height={20}
            />

          </div>
        
        </div>

        {searchModalStatus === true && hamburguerStatus === false && (
          <SearchModal handleSearchModal={handleSearchModal} handleFilter={handleSearch} />
        )}

        {hamburguerStatus === true && (
          <img
            id={style["closeMenu"]}
            className="d-lg-none d-xl-none d-xxl-none"
            src="/img/fi-rr-cross.svg"
            alt="close"
            width={24}
            height={24}
            style={{ /*display: 'none', */ zindex: 5 }}
            onClick={() => setHamburguerStatus(false)}
            zindex={20}
          />
        )}


        {
          hamburguerStatus === true && (
            <>
              <Hamburguer handleLogout={handleLogout} setHamburguerStatus={setHamburguerStatus} />
            </>
          )
        }

      </header>
    </>
  );
}


function SearchBar({ handleSearch, handleSearchModal }) {
  return (
    <>
      <button
        id={style.openSearchBtn}
        className="btn btn-primary  d-xl-none d-xxl-none btn1 btn1-t1"
        style={{ width: "52px", height: "52px", display: "flex", justifyContent: "center", alignItems: "center" }}
        type="button"
        onClick={handleSearchModal}
      >
        <img
          src="/img/fi-br-search.svg"
          alt="search"

          style={{ width: 20, height: 20 }}
        />
      </button>
      <div
        id={style["search-div"]}
        className="d-none d-sm-none d-md-none d-lg-none d-xl-flex d-xxl-flex"
      >
        <img src="/img/fi-br-search.svg" alt="search" />
        <input
          id={style["search-input"]}
          className="body-regular margin-b-0"
          type="search"
          placeholder="Buscar un personaje"
          name="search"
          onChange={handleSearch}
        />
      </div>
    </>
  )
}

function Nav({ searchStatus, handleLogout, headerType }) {

  const idLi = headerType === "alternative" ? style.navItem2 : style.navItem1;
//console.log(searchStatus)
  return (
    <>
      <ul
        id="nav"
        className="list-inline d-none d-lg-flex"
        style={searchStatus === false ? { gap: 30, color: "#ffffff", margin: 0 } : {
          gap: 30, color: "#ffffff", margin: 0, position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)"
        }}
      >
        <Link to="/">
          <li id={idLi} className="list-inline-item body-regular">
            Inicio
          </li>
        </Link>
        <Link to="/about">
          <li id={idLi} className="list-inline-item body-regular">
            About
          </li>
        </Link>
        <li id={idLi} className="list-inline-item body-regular" onClick={handleLogout}>
          Cerrar sesión
        </li>
      </ul>
    </>
  )
}

function Hamburguer({handleLogout, setHamburguerStatus}) {


  return (

    <div id={style["hamburguer-menu"]}>
      <div
        id={style["hamburguer-box"]}
        className="d-flex flex-column justify-content-center align-items-start"
        style={{ zindex: 6 }}
      >
        <span className="margin-b-16 color-body body-regular">Menu</span>
        <div className="margin-b-24" style={{width:"100%"}} >
          <ul id={style["nav-hamb"]} className="titulo1-regular color-neutral900"
          >
            <Link to="/">
              <li onClick={() => setHamburguerStatus(false)} style={{ color: "#000000", textDecoration: "none" }}>Inicio</li>
            </Link>
            <Link to="/about">
              <li  onClick={() => setHamburguerStatus(false)} style={{ color: "#000000", textDecoration: "none" }}>About</li>
            </Link>
            <li onClick={handleLogout}>Salir</li>
          </ul>
        </div>
        <span className="color-body body-regular">Ponte en contacto</span>
        <span className="body-regular" style={{ color: "#0d8f0a" }}>
          thomasbarenghi@gmail.com
        </span>
      </div>
    </div>

  )
}