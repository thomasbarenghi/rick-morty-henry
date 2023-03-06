import React, { useEffect, useState } from "react";
import style from "../modal/modal.module.css";

export const hideHeader = (data) => {
  Modal.handleReverse(data);
};

const Modal = ({ children, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  const handleReverse = (data) => {
    setShowModal(data);
   // console.log(showModal);
  };

  Modal.handleReverse = handleReverse;

useEffect(() => {
  onClose()
}, [showModal === false])

  return (
    <div
      id={style.modal}
      className={
        showModal === false
          ? `${style["invisible"]} d-flex flex-column item-t1`
          : `${style["visible"]} d-flex flex-column item-t1`
      }
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
            onClick={() => handleReverse(false)}
            id="close-button"
            src="/img/fi-br-cross-green.svg"
            style={{ width: 15, height: 15 }}
            width={15}
            height={15}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
