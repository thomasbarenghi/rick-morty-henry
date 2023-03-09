import React, { useState } from "react";
import styles from "../switcherBotones/switcherBotones.module.css";

const SwitcherBotones = ({ datos, onIndexChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    onIndexChange(index);
  };

  return (
    <div key={datos} id={styles.switcherContainer} style={{display: "flex"}} >
      {datos.map((dato, index) => (
        <button
          key={index}
          className={`${
            activeIndex === index
              ? `${styles.active} ${styles["tab-button"]}`
              : `${styles.normal} ${styles["tab-button"]}`
          }`}
          onClick={() => handleClick(index)}
        >
          {dato}
        </button>
      ))}
    </div>
  );
};

export default SwitcherBotones;
