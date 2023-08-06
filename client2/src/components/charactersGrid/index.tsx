import style from "./index.module.scss";
import { Select, Modal, SwitcherButtons, CharacterItem } from "@/components";
import { useState, useEffect } from "react";
import { changeIndex, changeFilter } from "../../../redux/actions/general";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
//import Create from "../createCharacter/create";

export default function CharactersGrid({ searchValue }: any) {
  const dispatch = useAppDispatch();
  const elementosFiltrado = {
    genero: ["Male", "Female", "unknown", "Genderless"],
    especie: ["Human", "Alien"],
    orden: ["A-Z", "Z-A"],
  };
  const [filtro, setFiltro] = useState({
    genero: "default",
    especie: "default",
    search: "",
  });

  const state = useSelector((state: any) => state?.personajes);

  const onIndexChange = (index: number) => {
    dispatch(changeIndex(index));
  };

  const handleFilter = (event: any) => {
    const { name, value } = event.target;
    setFiltro({ ...filtro, [name]: value });
  };

  const handleRestoreFilter = () => {
    setFiltro({ genero: "default", especie: "default", search: "" });
  };

  const handleCloseModal = () => {
    //  console.log("close");
  };

  useEffect(() => {
    dispatch(changeFilter(filtro));
  }, [filtro]);

  const [createVisibility, setCreateVisibility] = useState(false);

  const handleCreateVisibility = (e: any) => {
    setCreateVisibility(!createVisibility);
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
            datos={["Todos", "Seleccionados", "Favoritos", "Propios"]}
            onIndexChange={onIndexChange}
          />
          <button
            id="openModal"
            className={`${style.modalOpen} btn btn-primary btn1 btn1-t1`}
            type="button"
          >
            Filtrar
          </button>
          <button
            id="openModal"
            onClick={() => setCreateVisibility(true)}
            className={`${style.modalOpen} btn btn-primary btn1 btn1-t1`}
            style={{ whiteSpace: "nowrap" }}
            type="button"
          >
            Crear un personaje
          </button>

          <Modal onClose={handleCloseModal} name={"filters"}>
            <div id="modalInner">
              <Select
                name="genero"
                handleFilter={handleFilter}
                data={elementosFiltrado.genero}
              />
              <Select
                name="especie"
                handleFilter={handleFilter}
                data={elementosFiltrado.especie}
              />
              <Select
                name="orden"
                handleFilter={handleFilter}
                data={elementosFiltrado.orden}
              />
              <button
                style={{
                  marginTop: "16px",
                  borderRadius: "10px !important",
                }}
                className={`${style.btn3} btn btn-primary btn1 btn1-t1`}
                onClick={handleRestoreFilter}
              >
                Restaurar filtros
              </button>
            </div>
          </Modal>
          {createVisibility && (
            // <Create handleCreateVisibility={handleCreateVisibility} />
            <></>
          )}
        </div>
      </div>
      <div id={style["componentContainer"]}>
        {Array.isArray(state?.activos) &&
          state?.activos &&
          state?.activos?.map((character: any) => (
            <CharacterItem data={character} key={character} />
            // <></>
          ))}
      </div>
      {Array.isArray(state?.activos) && state?.activos.length === 0 && (
        <div>
          <h1
            className="text-center titulo2-bold"
            style={{ marginTop: 80, color: "#379c35" }}
          >
            Hey, parece que no hay ningun personaje por aquí&nbsp;
          </h1>
        </div>
      )}
    </section>
  );
}
