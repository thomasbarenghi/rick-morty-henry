import { type Metadata } from 'next'
import style from './page.module.scss'
import Link from 'next/link'
import { getCharacters } from '@/services/getCharacters.service'
import { CharacterItem } from '@/components'

export const metadata: Metadata = {
  title: 'Rick y Morty | Thomas Barenghi',
  description: 'Rick y Morty | Thomas Barenghi'
}

const Home = async () => {
  const characters = await getCharacters()
  return (
    <main>
      <section
        id={style['seccion-hero']}
        className='d-flex d-sm-flex d-md-flex d-lg-flex d-xl-grid d-xxl-grid flex-column-reverse justify-content-center align-items-center flex-sm-column-reverse flex-md-column-reverse flex-lg-row padding-t1'
      >
        <div>
          <h1 className='titulo1-regular'>
            Descubre las aventuras de <strong>Rick y Morty</strong>
            <br />
          </h1>
          <p className='body-regular margin-b-24'>
            ¿Estás listo para sumergirte en un mundo lleno de locura, humor negro y aventuras intergalácticas? Entonces
            no te pierdas las aventuras de Rick y Morty.
            <br />
          </p>
          <Link className='btn btn-primary btn1 btn1-t1' href='/about'>
            Sobre el proyecto
          </Link>
        </div>
        <div className='d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-end justify-content-xl-end justify-content-xxl-end'>
          <img id={style['hero-img']} src='/img/Group 3.svg' />
        </div>
      </section>
      <section id={style['seccion-personajes']} className='padding-t1'>
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', paddingBottom: '30px' }}>
          <img src='/img/Frame 13.svg' style={{ width: 'auto', height: 45 }} />
        </div>
        <div id={style.componentContainer}>
          {characters?.data?.map((character) => <CharacterItem data={character} key={character.id} />)}
        </div>
        {characters?.data?.length === 0 && (
          <div>
            <h1 className='text-center titulo2-bold' style={{ marginTop: 80, color: '#379c35' }}>
              Hey, parece que no hay nada por aquí
            </h1>
          </div>
        )}
      </section>
    </main>
  )
}

export default Home
