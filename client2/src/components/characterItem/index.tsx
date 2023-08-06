import style from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { manageFavoriteCharacter } from "@/redux/slices/client/favorites";
import { useState, useRef, useEffect } from "react";

type CharacterItemProps = {
  data: any;
};

export default function Characters({ data }: CharacterItemProps) {
  const dispatch = useAppDispatch();
  const favoritosList = useAppSelector(
    (state) => state?.client?.favorites?.characters,
  );
  const idFavorito = favoritosList.some((obj) => obj.id === data.id);
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  const [showSelect, setShowSelect] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const userId = 1;
  const ref = useRef<HTMLDivElement>(null);

  const handleFavorite = (data: any) => {
    dispatch(manageFavoriteCharacter(data));
  };
  const handleDelete = (id: any) => {
    // dispatch(deletePropio(data.id));
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (isSelected === true) {
        setShowSelect(true);
        console.log("esta seleccionado");
        return;
      } else {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSelect(false);
          console.log("no esta seleccionado");
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    console.log("isSelected:", isSelected);
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
        console.log("esta seleccionado");
        return;
      }
      setShowSelect(!showSelect);
      console.log("no esta seleccionado");
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
  console.log("data:", data);
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
            <button
              onClick={() => handleFavorite(data?.id)}
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
          {data.author !== 1 && data.author == userId && (
            <button
              className="btn btn-primary btn1 btn1-t1"
              type="button"
              onClick={() => handleDelete(data.id)}
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </>
  );
}
