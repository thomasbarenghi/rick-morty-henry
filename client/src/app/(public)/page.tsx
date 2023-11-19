import { type Metadata } from 'next'
import style from './page.module.scss'
import { CharactersGrid } from '@/components'

export const metadata: Metadata = {
  title: 'Rick y Morty | Thomas Barenghi',
  description: 'Rick y Morty | Thomas Barenghi'
}

const Home = () => (
  <main>
    <Hero />
    <CharactersGrid />
  </main>
)

export default Home

const Hero = () => (
  <section
    id={style['seccion-hero']}
    className='d-flex d-sm-flex d-md-flex d-lg-flex d-xl-grid d-xxl-grid flex-column-reverse justify-content-start align-items-center flex-sm-column-reverse flex-md-column-reverse flex-lg-row padding-t1'
  >
    <div>
      <h1 className='titulo1-regular'>
        Descubre las aventuras de <strong>Rick y Morty</strong>
        <br />
      </h1>
      <p className='body-regular margin-b-24'>
        ¿Estás listo para sumergirte en un mundo lleno de locura, humor negro y aventuras intergalácticas? Entonces no
        te pierdas las aventuras de Rick y Morty.
        <br />
      </p>
      <button className='btn btn-primary btn1 btn1-t1' type='button'>
        Conoce a los personajes
        <br />
      </button>
    </div>
    <div className='d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-end justify-content-xl-end justify-content-xxl-end'>
      <img id={style['hero-img']} src='/img/Group 3.svg' />
    </div>
  </section>
)
