'use client'
import { useAppSelector } from '@/redux/hooks'
import style from '../page.module.scss'

const Hero = () => {
  const state = useAppSelector((state) => state?.client?.characters?.currentCharacter)
  return (
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
  )
}

export default Hero
