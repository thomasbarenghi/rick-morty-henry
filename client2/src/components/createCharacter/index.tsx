import { useState } from "react";
import styles from "./index.module.scss";
import { useAppDispatch } from "@/redux/hooks";
import { createCharacter } from "@/redux/slices/client/characters";
import Preview from "./characterPreview";
import { Input } from "@/components";
import { characterOptions as options } from "@/constants";

type CreateProps = {
  handleCreateVisibility: (e: boolean) => void;
};

export default function CreateCharacter({
  handleCreateVisibility,
}: CreateProps) {
  const dispatch = useAppDispatch();

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

  console.log(formData);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("formData", formData);
    dispatch(createCharacter(formData));
    e.target.reset();
    setVisibility(false);
    handleCreateVisibility(false);
  };

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
            <h1 className="titulo3-bold margin-b-24">
              Creemos un personaje 🚀
            </h1>

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
                <Input
                  renderType="input"
                  label="Nombre del personaje"
                  name="name"
                  handleChange={(e: any) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  value={formData.name}
                  required={true}
                  type="text"
                />
                <Input
                  renderType="select"
                  selectOptions={options.species}
                  label="Especie"
                  name="species"
                  handleChange={(e: any) => {
                    setFormData({ ...formData, species: e.value });
                  }}
                  value={formData.species}
                  required={true}
                  type="text"
                />
              </div>
              <div
                className="d-flex flex-column flex-md-row form-group"
                style={{ gap: 8 }}
              >
                <Input
                  renderType="select"
                  selectOptions={options.gender}
                  label="Genero"
                  name="gender"
                  handleChange={(e: any) => {
                    setFormData({ ...formData, gender: e.value });
                  }}
                  value={formData.gender}
                  required={true}
                  type="text"
                />
                <Input
                  renderType="select"
                  selectOptions={options.origin}
                  label="Origen"
                  name="origin_name"
                  handleChange={(e: any) => {
                    console.log(e);
                    setFormData({ ...formData, origin_name: e.value });
                  }}
                  value={formData.origin_name}
                  required={true}
                  type="text"
                />
              </div>
              <div
                className="d-flex flex-column flex-md-row form-group"
                style={{ gap: 8 }}
              >
                <Input
                  renderType="select"
                  selectOptions={options.origin}
                  label="Ultima ubicacion"
                  name="location_name"
                  handleChange={(e: any) => {
                    setFormData({ ...formData, location_name: e.value });
                  }}
                  value={formData.location_name}
                  required={true}
                  type="text"
                />
                <Input
                  renderType="input"
                  label="Link imagen"
                  name="linkimagen"
                  handleChange={(e: any) => {
                    setFormData({ ...formData, image: e.target.value });
                  }}
                  value={formData.image}
                  required={true}
                  type="text"
                />
              </div>
              <div
                className="d-flex flex-column flex-md-row form-group"
                style={{ gap: 8 }}
              >
                <Input
                  renderType="select"
                  selectOptions={options.status}
                  label="Tipo"
                  name="status"
                  handleChange={(e: any) => {
                    setFormData({ ...formData, status: e.value });
                  }}
                  value={formData.status}
                  required={true}
                  type="text"
                />
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
            height: 15,
          }}
          onClick={(e) => handleCreateVisibility(false)}
          width={24}
          height={24}
        />
      </div>
    </section>
  );
}
