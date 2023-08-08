import style from "./index.module.scss";
import {
  SwitcherButtons,
  CharacterItem,
  CreateCharacter,
  ChatactersFilter,
} from "@/components";
import { useState } from "react";
import { setIndex } from "@/redux/slices/client/characters";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectorIndexCharacters } from "@/redux/selectors/characters";
import SearchBar from "../header/searchBar";

export default function CharactersGrid({ searchValue }: any) {
  const dispatch = useAppDispatch();
  const [createVisibility, setCreateVisibility] = useState(false);
  const [filterVisibility, setFilterVisibility] = useState(false);
  const characters = useAppSelector(selectorIndexCharacters);
  const auth = useAppSelector((state) => state?.authSession?.auth);

  const onIndexChange = (index: number) => {
    dispatch(setIndex(index));
  };

  return (
    <section id={style["seccion-personajes"]} className="padding-t1">
      <div
        className="d-flex flex-column align-items-center align-content-center flex-sm-column align-items-sm-center flex-md-column align-items-md-center flex-lg-column align-items-lg-center flex-xl-row align-items-xl-start flex-xxl-row align-items-xxl-start margin-b-24"
        style={{ display: "flex", gap: "32px" }}
      >
        <img src="/img/Frame 13.svg" style={{ width: "auto", height: 45 }} />

        <div id={style["optionsContainer"]}>
          <SwitcherButtons
            datos={["Todos", "Favoritos", "Propios"]}
            onIndexChange={onIndexChange}
          />
          <button
            id="openModal"
            className={`${style.modalOpen} btn btn-primary btn1 btn1-t1`}
            onClick={() => setFilterVisibility(true)}
            type="button"
          >
            Filtrar
          </button>
          <SearchBar />
          {auth.isLogged && (
            <button
              id="openModal"
              onClick={() => setCreateVisibility(true)}
              className={`${style.modalOpen} btn btn-primary btn1 btn1-t1`}
              style={{ whiteSpace: "nowrap" }}
              type="button"
            >
              Crear un personaje
            </button>
          )}
          {createVisibility && (
            <CreateCharacter handleCreateVisibility={setCreateVisibility} />
          )}
          {filterVisibility && (
            <ChatactersFilter handleVisibility={setFilterVisibility} />
          )}
        </div>
      </div>
      <div id={style["componentContainer"]}>
        {Array.isArray(characters) &&
          characters &&
          characters?.map((character: any) => (
            <CharacterItem data={character} key={character} />
          ))}
      </div>
      {Array.isArray(characters) && characters?.length === 0 && (
        <div>
          <h1
            className="text-center titulo2-bold"
            style={{ marginTop: 80, color: "#379c35" }}
          >
            {auth.isLogged
              ? "Hey, parece que no hay nada por aquí"
              : "Hey, parece que no hay nada por aquí, ¿Quieres crear un personaje, agregar a favoritos o ver tus personajes? Inicia sesión o regístrate 😎"}
          </h1>
        </div>
      )}
    </section>
  );
}
