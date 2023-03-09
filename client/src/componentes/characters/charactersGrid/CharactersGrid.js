import Characters from "../characters/characters";
import style from "./charactersgrid.module.scss";
import SwitcherBotones from "../../switcherBotones/SwitcherBotones";
import Modal from "../../modal/modal";
import Select from "../../select/Select";
import { hideHeader } from "../../modal/modal";
import { useState, useEffect } from "react";
import { getCharacters, changeIndex, changeFilter, getFavorites, getPropios } from "../../../redux/actions/actions";
import { useSelector, useDispatch } from 'react-redux';
import Create from "../createCharacter/create";


export default function CharactersGrid({ searchValue }) {

    const dispatch = useDispatch();
    const elementosFiltrado = { genero: ["Male", "Female", "unknown", "Genderless"], especie: ["Human", "Alien"], orden: ["A-Z", "Z-A"] };
    const [filtro, setFiltro] = useState({ genero: "default", especie: "default", search: "" });

    const state = useSelector((state) => state?.personajes);
    useEffect(() => { dispatch(getCharacters()); }, [dispatch]);

    const onIndexChange = (index) => { dispatch(changeIndex(index)) };

    const handleFilter = (event) => {
        const { name, value } = event.target;
        setFiltro({ ...filtro, [name]: value });
    };

    const handleRestoreFilter = () => {
        setFiltro({ genero: "default", especie: "default", search: "" })
    }

    const handleCloseModal = () => {
        //  console.log("close");
    }

    useEffect(() => { dispatch(changeFilter(filtro)) }, [filtro]);
    useEffect(() => {
        dispatch(getFavorites())
        dispatch(getPropios())
    }, []);

    const [createVisibility, setCreateVisibility] = useState(false);

    const handleCreateVisibility = (e) => {
        setCreateVisibility(!createVisibility);
    }


    return (
        <section id={style["seccion-personajes"]} className="padding-t1">
            <div
                className="d-flex flex-column align-items-center align-content-center flex-sm-column align-items-sm-center flex-md-column align-items-md-center flex-lg-column align-items-lg-center flex-xl-row align-items-xl-start flex-xxl-row align-items-xxl-start margin-b-24"
                style={{ display: "flex", gap: "32px" }}
            >
                <img src="/img/Frame 13.svg" style={{ width: "auto", height: 45 }} />

                <div id={style["optionsContainer"]}>
                    <SwitcherBotones
                        datos={["Todos", "Seleccionados", "Favoritos", "Propios"]}
                        onIndexChange={onIndexChange}
                    />
                    <button
                        id="openModal"
                        onClick={() => hideHeader(true, "filters")}
                        className={`${style.modalOpen} btn btn-primary btn1 btn1-t1`}
                        type="button"
                    >
                        Filtrar
                    </button>
                    <button
                        id="openModal"
                        onClick={() => setCreateVisibility(true)}
                        className={`${style.modalOpen} btn btn-primary btn1 btn1-t1`}
                        style={{whiteSpace: "nowrap"}}
                        type="button"
                    >
                        Crear un personaje
                    </button>

                    <Modal onClose={handleCloseModal} name={"filters"} >
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
                    {createVisibility && <Create handleCreateVisibility={handleCreateVisibility} />}
                </div>
            </div>
            <div id={style["componentContainer"]}>
                {
                   Array.isArray(state?.activos) && state?.activos && state?.activos?.map((character) => (
                        <Characters data={character} />
                    ))
                }
            </div>
            {state?.activos.length === 0 && (
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
