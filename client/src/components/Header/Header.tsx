'use client'
import style from './index.module.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Routes } from '@/utils/constants'
import Hamburguer from './Menu'
import Nav from './NavBar'
import Image from 'next/image'

const Header = () => {
  const [headerType, setHeaderType] = useState('default')
  const [hamburguerStatus, setHamburguerStatus] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeaderType('alternative')
      } else {
        setHeaderType('default')
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      id={style.header}
      className='d-flex flex-row justify-content-between align-items-center padding-lr-t1 padding-tb-30 margin-b-0'
      style={headerType === 'alternative' ? { background: 'rgba(55,156,53,0.85)' } : {}}
    >
      <Link href={Routes.HOME}>
        <Image id={style['header-logo']} src='/img/Rectangle 1.svg' width={213} height={40} alt='logo' />
      </Link>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Nav />
        <div
          id={style.openSearchBtn}
          onClick={() => {
            setHamburguerStatus(true)
          }}
          className='d-xl-none d-xxl-none'
          style={{
            width: '52px',
            height: '52px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            className='d-inline d-sm-inline d-md-inline d-lg-inline d-xl-none d-xxl-none'
            src='/img/hamburger2.svg'
            alt='hamburguer'
            width={20}
            height={20}
          />
        </div>
      </div>
      {hamburguerStatus && (
        <Image
          id={style.closeMenu}
          className='d-lg-none d-xl-none d-xxl-none'
          src='/img/fi-rr-cross.svg'
          alt='close'
          width={24}
          height={24}
          onClick={() => {
            setHamburguerStatus(false)
          }}
        />
      )}
      {hamburguerStatus && <Hamburguer setHamburguerStatus={setHamburguerStatus} />}
    </header>
  )
}

export default Header
