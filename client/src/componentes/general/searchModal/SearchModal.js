import styles from "../searchModal/searchmodal.module.scss";

export default function SearchModal({handleSearchModal, handleFilter}) {
  return (
    <div
      id={styles.searchModalBox}
      className="d-flex d-lg-none justify-content-center align-items-center"
    >
      <div className="padding-lr-t1">
        <h1 className="titulo3-bold" style={{ color: "#ffffff" }}>
          Busca a tu personaje favorito
        </h1>
        <div id={styles["search-div-1"]}>
          <img src="/img/fi-br-search.svg" />
          <input
            id={styles["search-input-1"]}
            className="body-regular margin-b-0"
            type="search"
            placeholder="Buscar un personaje"
            name="search"
            onChange={handleFilter}
          />
        </div>
      </div>
      <img id={styles.closeModal} onClick={handleSearchModal} src="/img/fi-br-cross-white.svg" />
    </div>
  );
}
