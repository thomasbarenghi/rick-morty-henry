import Characters from "../characters/characters";
import style from "./charactersgrid.module.scss";
import SwitcherBotones from "../../general/switcherBotones/SwitcherBotones";
import Modal from "../../general/modal/Modal";
import Select from "../../general/select/Select";
import { hideHeader } from "../../general/modal/Modal";
import { useState, useEffect } from "react";
import { getCharacters, changeIndex, changeFilter, getFavorites } from "../../../redux/actions/actions";
import { useSelector, useDispatch } from 'react-redux';

export default function CharactersGrid({ searchValue }) {

    const dispatch = useDispatch();
    const [index, setIndex] = useState(0);
    const elementosFiltrado = { genero: ["Male", "Female", "unknown", "Genderless"], especie: ["Human", "Alien"], };
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

    useEffect(() => { dispatch(changeFilter(filtro)) }, [filtro]);
    useEffect(() => {dispatch(getFavorites())}, []);


    return (
        <section id={style["seccion-personajes"]} className="padding-t1">
            <div
                className="d-flex flex-column align-items-center align-content-center flex-sm-column align-items-sm-center flex-md-column align-items-md-center flex-lg-column align-items-lg-center flex-xl-row align-items-xl-start flex-xxl-row align-items-xxl-start margin-b-24"
                style={{ display: "flex", gap: "32px" }}
            >
                <img src="/img/Frame 13.svg" style={{ width: "auto", height: 45 }} />

                <div id={style["optionsContainer"]}>
                    <SwitcherBotones
                        datos={["Todos", "Seleccionados", "Favoritos"]}
                        onIndexChange={onIndexChange}
                    />
                    <button
                        id="openModal"
                        onClick={() => hideHeader(true)}
                        className={`${style.modalOpen} btn btn-primary btn1 btn1-t1`}
                        type="button"
                    >
                        Filtrar
                    </button>

                    <Modal>
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
                </div>
            </div>
            <div id={style["componentContainer"]}>
                {
                    state?.activos?.map((character) => {

                        return <Characters data={character} />
                    })
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
