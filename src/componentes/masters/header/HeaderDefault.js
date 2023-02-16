import style from "./header.module.scss";
import { useEffect, useState } from "react";
import SearchModal from "../../general/searchModal/SearchModal";
import { changeFilter } from "../../../redux/actions/actions";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function HeaderDefault({ handleFilter, searchStatus }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [headerType, setHeaderType] = useState("default");
  const [searchModalStatus, setSearchModalStatus] = useState(false);

  const handleSearch = (dato) => {
    console.log(dato.target.name)
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
    Cookies.remove("logged");
    navigate("/login");
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
          />
        </Link>
        <Nav searchStatus={searchStatus} handleLogout={handleLogout} headerType={headerType} />
        {searchStatus === true && (<SearchBar handleSearch={handleSearch} handleSearchModal={handleSearchModal} />)}
        {searchModalStatus === true && (
          <SearchModal handleSearchModal={handleSearchModal} handleFilter={handleSearch} />
        )}
      </header>
    </>
  );
}


function SearchBar({ handleSearch, handleSearchModal }) {
  return (
    <>
      <button
        id={style.openSearchBtn}
        className="btn btn-primary d-lg-none d-xl-none d-xxl-none btn1 btn1-t1"
        type="button"
        onClick={handleSearchModal}
      >
        <img
          src="/img/fi-br-search.svg"

          style={{ width: 20, height: 20 }}
        />
      </button>
      <div
        id={style["search-div"]}
        className="d-none d-sm-none d-md-none d-lg-flex d-xl-flex d-xxl-flex"
      >
        <img src="/img/fi-br-search.svg" />
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
