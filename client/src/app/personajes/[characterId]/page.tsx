import { type Metadata } from 'next'
import style from './page.module.scss'
import Image from 'next/image'
import { getCharacter } from '@/services/getCharacter.service'

export const metadata: Metadata = {
  title: 'Personaje | Rick y Morty | Thomas Barenghi',
  description: 'Personaje | Rick y Morty | Thomas Barenghi'
}

interface Data {
  title: string
  icon: string
  description: string
}

const Page = async ({ params }: { params: { characterId: string } }) => {
  const { data: state } = await getCharacter(params.characterId)

  const data: Data[] = [
    {
      title: 'Origen',
      icon: '/img/fi-br-rocket.svg',
      description: state?.origin?.name ?? 'Desconocido'
    },
    {
      title: 'Ultima ubicación',
      icon: '/img/fi-br-marker.svg',
      description: state?.location?.name ?? 'Desconocido'
    }
  ]

  return (
    <main>
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
      <section
        id={style['seccion-tecnologias']}
        className='d-flex flex-column justify-content-center align-items-center align-content-center padding-t1'
      >
        <h1 className='text-center titulo1-regular margin-b-60 span-100'>
          Sobre este <strong>personaje </strong>🥳
          <br />
        </h1>
        <div id={style.grid} style={{ width: '100%' }}>
          {Array.isArray(data) &&
            data.map((item) => (
              <div key={item?.title} id={style.item} className='d-flex flex-column item-t1'>
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
            ))}
        </div>
      </section>
    </main>
  )
}

export default Page
