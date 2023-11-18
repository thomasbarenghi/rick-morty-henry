'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import style from './page.module.scss'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Personaje | Rick y Morty | Thomas Barenghi',
  description: 'Personaje | Rick y Morty | Thomas Barenghi',
  themeColor: '#379c35'
}

export default function CharacterDetail() {
  const state = useAppSelector((state) => state?.client?.characters?.currentCharacter)
  console.log('state', state)
  return (
    <>
      <HeroSection state={state} />
      <DetallesSection state={state} />
    </>
  )
}

function HeroSection({ state }: any) {
  console.log('state HeroSection', state)
  return (
    <>
      <section
        id={style['seccion-hero']}
        className='d-flex d-sm-flex d-md-flex d-lg-flex d-xl-grid d-xxl-grid flex-column-reverse justify-content-center align-items-center flex-sm-column-reverse flex-md-column-reverse flex-lg-row padding-t1'
      >
        <div
          className='text-center text-sm-center text-md-start d-flex flex-column justify-content-center align-items-center flex-sm-column flex-md-row'
          style={{ paddingTop: 15, gap: 16 }}
        >
          <img id={style['img-hero']} src={state?.image} />
          <div>
            <h1 id={style['titulo-hero']} className='titulo1-regular margin-b-0' style={{ display: 'contents' }}>
              <strong>{state?.name}</strong>
            </h1>
            <p className='body-regular margin-b-0 span-100'>
              {state?.gender} | {state?.species} | {state?.status}
              <br />
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function DetallesSection({ state }: any) {
  const [about, setAbout] = useState([] as any)
  console.log('state DetallesSection', state)
  useEffect(() => {
    setAbout([
      {
        title: 'Origen',
        icon: '/img/fi-br-rocket.svg',
        description: state?.origin_name
      },
      {
        title: 'Ultima ubicación',
        icon: '/img/fi-br-marker.svg',
        description: state?.location_name
      }
    ])
  }, [state])

  console.log('about', about)

  return (
    <>
      <section
        id={style['seccion-tecnologias']}
        className='d-flex flex-column justify-content-center align-items-center align-content-center padding-t1'
      >
        <h1 className='text-center titulo1-regular margin-b-60 span-100'>
          Sobre este <strong>personaje </strong>🥳
          <br />
        </h1>
        <div id={style['grid']} style={{ width: '100%' }}>
          {about.length > 0 && (
            <>
              {about.map((item: any) => {
                return (
                  <div key={item?.title} id={style['item']} className='d-flex flex-column item-t1'>
                    <div
                      className='d-flex flex-column justify-content-start align-items-start flex-sm-column align-items-sm-start flex-md-row align-items-md-start align-items-lg-center'
                      style={{ gap: 14 }}
                    >
                      <Image alt='image' id={style['item-icon']} src={item.icon} width={50} height={50} />
                      <h1 className='margin-b-0 titulo3-regular'>
                        <strong>{item.title}:</strong> {item.description}
                        <br />
                      </h1>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </section>
    </>
  )
}
