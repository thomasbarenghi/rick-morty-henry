import React, { useState } from 'react'
import styles from './switcher.module.scss'

interface SwitcherProps {
  data: string[]
  onIndexChange: (index: number) => void
}

const Switcher = ({ data, onIndexChange }: SwitcherProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleClick = (index: number) => {
    setActiveIndex(index)
    onIndexChange(index)
  }

  return (
    <div id={styles.switcherContainer} style={{ display: 'flex' }}>
      {data.map((data, index) => (
        <button
          key={index}
          className={`${
            activeIndex === index
              ? `${styles.active} ${styles['tab-button']}`
              : `${styles.normal} ${styles['tab-button']}`
          }`}
          onClick={() => {
            handleClick(index)
          }}
        >
          {data}
        </button>
      ))}
    </div>
  )
}

export default Switcher
