import style from "./characters.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { selectCharacter } from "../../../redux/actions/general";
import { deletePropio } from "../../../redux/actions/propios";
import { favoriteCharacter } from "../../../redux/actions/favorites";
import Cookies from "js-cookie";
import { useState, useRef, useEffect } from "react";

export default function Characters({ data }) {

  const [showSelect, setShowSelect] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const userId = Cookies.get('userId');
  const dispatch = useDispatch();
  const handleSelect = () => { setIsSelected(true); console.log("se selcciono"); dispatch(selectCharacter(data)); }
  const handleFavorite = () => { dispatch(favoriteCharacter(data)); }
  const handleDelete = (id) => { dispatch(deletePropio(data.id)); }

  const seleccionadosList = useSelector((state) => state?.personajes?.seleccionados);
  const favoritosList = useSelector((state) => state?.personajes?.favoritos);
  const idSeleccionado = seleccionadosList.some((obj) => obj.id === data.id);
  const idFavorito = favoritosList.some((obj) => obj.id === data.id);


  const [touchStartTime, setTouchStartTime] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {

      if (isSelected === true) {
        setShowSelect(true);
        console.log("esta seleccionado")
        return
      }
      else {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSelect(false);
          console.log("no esta seleccionado")
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    console.log("isSelected:", isSelected)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isSelected]);


  function handleTouchStart() {
    setTouchStartTime(Date.now());
  }

  function handleTouchEnd() {
    const touchEndTime = Date.now();
    if (touchEndTime - touchStartTime < 200) {
      if (isSelected === true) {
        setShowSelect(true);
        console.log("esta seleccionado")
        return
      }
      setShowSelect(!showSelect);
      console.log("no esta seleccionado")
    }
  }

  function handleClick() {
    if (window.innerWidth > 1023) {
      window.location.href = `/personajes/${data.id}`;
    }
  }

  function handleDoubleClick() {
    if (window.innerWidth <= 1023) {
      window.location.href = `/personajes/${data.id}`;
    }
  }
  //console.log(window.innerWidth);


  return (
    <>
      {data && (
        <div
          ref={ref}
          key={data.id}
          style={{ position: "relative" }}
          id={style.componente}
          className="item-t1"
        >
          <div
            id={style["btns-todos-box"]}
            className="d-flex justify-content-end"
          >
            {
              (window.innerWidth > 1023 || showSelect === true) && (

                <button
                  onClick={() => handleSelect(data.id)}
                  type="button"
                  className={
                    idSeleccionado === true
                      ? `${style["btn-verde-blanco"]} ${style["visible"]} btn btn-primary  justify-content-center align-items-center btn1 `
                      : `${style["btn-verde-blanco"]} btn btn-primary  justify-content-center align-items-center btn1`
                  }
                >
                  {idSeleccionado === true && (
                    <>
                      <img src="/img/fi-br-cross-white.svg" />
                      <span>Deseleccionar</span>
                    </>
                  )}
                  {idSeleccionado === false && (
                    <>
                      <img src="/img/fi-br-archive.svg" />
                      <span>Seleccionar</span>
                    </>
                  )}
                </button>
              )

            }
            <button
              onClick={() => handleFavorite(data.id)}
              className={`d-flex justify-content-center align-items-center btn1  ${style["btn-blanco-verde"]}`}
              type="button"
            >
              {idFavorito === true && (
                <img
                  width={20}
                  height={20}
                  src="/img/fi-br-heart-colored.svg"
                />
              )}
              {idFavorito === false && <img src="/img/fi-br-heart.svg" />}
            </button>
          </div>

          <div
            onMouseHover={() => console.log("hover")}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img id={style["personajes-img"]} src={data.image} />
            <h1
              id="titulo"
              className="titulo3-bold"
              style={{
                fontSize: 20,
                paddingTop: 15,
                marginTop: 5,
                marginBottom: 10,
                paddingRight: 10,
                paddingLeft: 10,

              }}

            >
              {data.name}
            </h1>
            <div id={style["box-propiedades"]} className="d-flex margin-b-24">
              <div
                className="d-flex flex-row justify-content-start align-items-center"
                style={{ gap: 8 }}
              >
                <img src="/img/especie.svg" />
                <p className="smallText-regular margin-b-0">{data.species} </p>
              </div>
              <div
                className="d-flex flex-row justify-content-start align-items-center"
                style={{ gap: 8 }}
              >
                <img src="/img/fi-br-gender.svg" />
                <p className="smallText-regular margin-b-0">{data.gender} </p>
              </div>
            </div>
          </div>
          {
            data.author !== 1 && data.author == userId && (
              <button className="btn btn-primary btn1 btn1-t1" type="button"
                onClick={() => handleDelete(data.id)}
              >
                Eliminar
              </button>
            )
          }
        </div>
      )}
    </>
  );
}
