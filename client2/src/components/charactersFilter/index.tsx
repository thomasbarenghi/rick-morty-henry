import React, { useState } from "react";
import style from "./index.module.scss";
import { Input } from "@/components";
import { characterOptions, orderOptions } from "@/constants";

type ModalProps = {
  handleVisibility: (data: boolean) => void;
};
const ChatactersFilter = ({ handleVisibility }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleFilter = (event: any) => {
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
  };

  const handleRestoreFilter = () => {
    console.log("restore");
  };

  return (
    <div
      id={style.modal}
      className={`${style["visible"]} d-flex flex-column item-t1`}
    >
      <div id={style.modalInner} className="d-flex flex-column item-t1">
        <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
          <h1
            className="subtitulo-bold margin-b-0"
            style={{ fontSize: 18, color: "black" }}
          >
            Filtros
          </h1>
          <img
            onClick={() => handleVisibility(false)}
            id="close-button"
            src="/img/fi-br-cross-green.svg"
            style={{ width: 15, height: 15 }}
            width={15}
            height={15}
          />
        </div>
        <div id="modalInner">
          <Input
            renderType="select"
            name="gender"
            handleChange={handleFilter}
            selectOptions={characterOptions.gender}
            label="Genero"
            value="default"
            customClass="mt-1"
          />
          <Input
            renderType="select"
            name="species"
            handleChange={handleFilter}
            selectOptions={characterOptions.species}
            label="Especie"
            value="default"
            customClass="mt-1"
          />
          <Input
            renderType="select"
            name="order"
            handleChange={handleFilter}
            selectOptions={orderOptions.name}
            label="Orden por nombre"
            value="default"
            customClass="mt-1"
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
      </div>
    </div>
  );
};

export default ChatactersFilter;
