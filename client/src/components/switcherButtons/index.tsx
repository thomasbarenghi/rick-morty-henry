import React, { useState } from 'react'
import styles from './index.module.scss'

type SwitcherBotonesProps = {
  datos: string[]
  onIndexChange: (index: number) => void
}
const SwitcherBotones = ({ datos, onIndexChange }: SwitcherBotonesProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleClick = (index: number) => {
    setActiveIndex(index)
    onIndexChange(index)
  }

  return (
    <div id={styles.switcherContainer} style={{ display: 'flex' }}>
      {datos.map((dato, index) => (
        <button
          key={index}
          className={`${
            activeIndex === index
              ? `${styles.active} ${styles['tab-button']}`
              : `${styles.normal} ${styles['tab-button']}`
          }`}
          onClick={() => handleClick(index)}
        >
          {dato}
        </button>
      ))}
    </div>
  )
}

export default SwitcherBotones
