import { useState, useEffect } from "react";
import styles from "./create.module.scss";
import { useDispatch } from "react-redux";
import { createPropio } from "../../../redux/actions/actions";

export default function Create({ handleCreateVisibility }) {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        status: "",
        species: "",
        type: "Generic",
        gender: "",
        origin_name: "",
        location_name: "",
        image: "",
    });



    const [visibility, setVisibility] = useState(false);

    console.log(formData)


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        dispatch(createPropio(formData))
        e.target.reset();
        setVisibility(false)
    }

    return (
                    <section
                        id={styles["crear-personaje"]}
                        className="d-flex flex-row justify-content-start align-items-stretch padding-lr-t1 padding-tb-t1"
                    >
                        <div id={styles["crear-personaje_inner"]} className="item-t1">
                            <div
                                id={styles["inner_grid"]}
                                className="d-xl-grid d-xxl-grid flex-row align-items-start item-t1"
                            >
                                <div id={styles["grid_col1"]}>
                                    <h1 className="titulo3-bold margin-b-24">Creemos un personaje 🚀</h1>



                                    <form
                                        onSubmit={handleSubmit}
                                        id="form"
                                        className="d-flex flex-column"
                                        style={{ gap: "8px !important" }}
                                    >
                                        <div
                                            className="d-flex flex-column flex-sm-column flex-md-row form-group"
                                            style={{ gap: 8 }}
                                        >
                                            <label
                                                id="label"
                                                className="form-label d-flex flex-column smallText-regular"
                                            >
                                                Nombre del personaje
                                                <input
                                                    id="input"
                                                    className="form-control smallText-regular"
                                                    type="text"
                                                    name="nombre"
                                                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                                                />
                                            </label>
                                            <label
                                                id="label"
                                                className="form-label d-flex flex-column smallText-regular"
                                            >
                                                Especie
                                                <input
                                                    id="input"
                                                    name="especie"
                                                    className="form-control smallText-regular"
                                                    type="text"
                                                    onChange={(e) => { setFormData({ ...formData, species: e.target.value }) }}
                                                />
                                            </label>
                                        </div>
                                        <div
                                            className="d-flex flex-column flex-md-row form-group"
                                            style={{ gap: 8 }}
                                        >
                                            <label
                                                id="label"
                                                className="form-label d-flex flex-column smallText-regular"
                                            >
                                                Genero
                                                <input
                                                    name="genero"
                                                    id="input"
                                                    className="form-control smallText-regular"
                                                    type="text"
                                                    onChange={(e) => { setFormData({ ...formData, gender: e.target.value }) }}
                                                />
                                            </label>
                                            <label
                                                id="label"
                                                className="form-label d-flex flex-column smallText-regular"
                                            >
                                                Origen
                                                <input
                                                    name="origen"
                                                    id="input"
                                                    className="form-control smallText-regular"
                                                    type="text"
                                                    onChange={(e) => { setFormData({ ...formData, origin_name: e.target.value }) }}
                                                />
                                            </label>
                                        </div>
                                        <div
                                            className="d-flex flex-column flex-md-row form-group"
                                            style={{ gap: 8 }}
                                        >
                                            <label
                                                id="label"
                                                className="form-label d-flex flex-column smallText-regular"
                                            >
                                                Ultima ubicacion
                                                <input
                                                    name="ultimaubi"
                                                    id="input"
                                                    className="form-control smallText-regular"
                                                    type="text"
                                                    onChange={(e) => { setFormData({ ...formData, location_name: e.target.value }) }}
                                                />
                                            </label>
                                            <label
                                                id="label"
                                                className="form-label d-flex flex-column smallText-regular"
                                            >
                                                Link imagen
                                                <input
                                                    name="linkimagen"
                                                    id="input"
                                                    className="form-control smallText-regular"
                                                    type="text"
                                                    onChange={(e) => { setFormData({ ...formData, image: e.target.value }) }}
                                                />
                                            </label>
                                        </div>
                                        <div
                                            className="d-flex flex-column flex-md-row form-group"
                                            style={{ gap: 8 }}
                                        >
                                            <label
                                                id="label"
                                                className="form-label d-flex flex-column smallText-regular"
                                            >
                                                Estatus
                                                <input
                                                    name="ultimaubi"
                                                    id="input"
                                                    className="form-control smallText-regular"
                                                    type="text"
                                                    onChange={(e) => { setFormData({ ...formData, status: e.target.value }) }}
                                                />
                                            </label>
                                        </div>
                            
                                        <button
                                            id="submit"
                                            className="btn btn-primary btn1-t1 btn1"
                                            type="submit"
                                        >
                                            Crear personaje
                                        </button>
                                    </form>



                                </div>
                                <div
                                    id={styles["grid_col2"]}
                                    className="d-none d-xl-flex d-xxl-flex justify-content-center align-items-center align-items-lg-center"
                                >

                                    <Preview formData={formData} />

                                </div>
                            </div>
                            <img
                                id="closeMenu-1"
                                className=""
                                src="/img/fi-rr-cross.svg"
                                style={{
                                    zIndex: 5,
                                    position: "absolute",
                                    top: 20,
                                    right: 20,
                                    width: 15,
                                    height: 15
                                }}
                                onClick={(e) => handleCreateVisibility(e)}
                                width={24}
                                height={24}
                            />
                        </div>
                    </section>
    )
}




function Preview({ formData }) {


    return (
        <div id={styles["col2_component"]} className="d-grid item-t1">
            <div style={{ position: "relative", height: "100%" }}>
                <img
                    id={styles["component_img"]}
                    src="/img/Rectangle 9.png"
                    width={238}
                    height={263}
                />
            </div>
            <div style={{ height: "max-content", width: "100%" }}>
                <h1 id={styles["component_titulo"]} className="titulo3-bold">
                    {formData.name}
                </h1>
                <div id={styles["box-propiedades"]} className="d-flex margin-b-24">
                    <div
                        className="d-flex flex-row justify-content-start align-items-center"
                        style={{ gap: 8 }}
                    >
                        <img src="/img/especie.svg" />
                        <p className="smallText-regular margin-b-0">{formData.species} </p>
                    </div>
                    <div
                        className="d-flex flex-row justify-content-start align-items-center"
                        style={{ gap: 8 }}
                    >
                        <img src="/img/especie.svg" />
                        <p className="smallText-regular margin-b-0">{formData.gender}</p>
                    </div>
                </div>
            </div>
        </div>


    )
}