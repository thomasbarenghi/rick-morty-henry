'use client'
import { Routes } from '@/utils/constants'
import style from './index.module.scss'
import Link from 'next/link'

interface HamburguerProps {
  setHamburguerStatus: (status: boolean) => void
}

const Hamburguer = ({ setHamburguerStatus }: HamburguerProps) => (
  <div id={style['hamburguer-menu']}>
    <div id={style['hamburguer-box']} className='d-flex flex-column justify-content-center align-items-start'>
      <span className='margin-b-16 color-body body-regular'>Menu</span>
      <div className='margin-b-24' style={{ width: '100%' }}>
        <ul id={style['nav-hamb']} className='titulo1-regular color-neutral900'>
          <Link
            href={Routes.HOME}
            style={{ color: '#000000', textDecoration: 'none' }}
            onClick={() => {
              setHamburguerStatus(false)
            }}
          >
            Inicio
          </Link>
          <Link
            href={Routes.ABOUT}
            style={{ color: '#000000', textDecoration: 'none' }}
            onClick={() => {
              setHamburguerStatus(false)
            }}
          >
            <li
              onClick={() => {
                setHamburguerStatus(false)
              }}
              style={{ color: '#000000', textDecoration: 'none' }}
            >
              Acerca de
            </li>
          </Link>
        </ul>
      </div>
      <span className='color-body body-regular'>Ponte en contacto</span>
      <span className='body-regular' style={{ color: '#0d8f0a' }}>
        thomasbarenghi@gmail.com
      </span>
    </div>
  </div>
)

export default Hamburguer
