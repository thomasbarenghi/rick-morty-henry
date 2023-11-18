import { Metadata } from 'next'
import { Tecnologias } from '@/data'
import styles from './page.module.scss'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About | Rick y Morty | Thomas Barenghi',
  description: 'About | Rick y Morty | Thomas Barenghi',
  themeColor: '#379c35'
}

export default function About() {
  return (
    <>
      <main>
        <HeroSection />
        <DescripcionAutor />
        <DescripcionProyecto />
        <TecnologiasUtilizadas />
      </main>
    </>
  )
}

function HeroSection() {
  return (
    <section
      id={styles['seccion-hero']}
      className='d-flex d-sm-flex d-md-flex d-lg-flex d-xl-grid d-xxl-grid flex-column-reverse justify-content-center align-items-center flex-sm-column-reverse flex-md-column-reverse flex-lg-row padding-t1'
    >
      <div className='text-start d-flex flex-column justify-content-center align-items-start'>
        <h1 className='text-center titulo1-regular margin-b-0' style={{ paddingTop: 15 }}>
          Conoce acerca <strong>de mi y el proyecto</strong>
        </h1>
      </div>
    </section>
  )
}

function DescripcionAutor() {
  return (
    <section id={styles['seccion-descripcion-autor']} className='padding-t1'>
      <h1 className='titulo1-regular margin-b-8'>
        Conozcámonos <strong>un poco más</strong> ❤️
        <br />
      </h1>
      <p className='margin-b-0 body-regular'>
        Soy Thomas Barenghi, diseñador UX/UI y desarrollador web frontend con 19 años de edad. Resido en Buenos Aires y
        quiero estudiar Desarrollo de Software en UADE. Además, complemento mi formación en el bootcamp Soy Henry, donde
        adquiriré más de 800 horas de experiencia y desarrollaré proyectos prácticos. Me esfuerzo por combinar mis
        habilidades técnicas con mi pasión por la creatividad para crear soluciones digitales innovadoras y atractivas
        para el usuario.
      </p>
    </section>
  )
}

function DescripcionProyecto() {
  return (
    <section id={styles['seccion-descripcion-proyecto']} className='padding-t1'>
      <h1 className='titulo1-regular margin-b-8'>
        Sobre <strong>la aplicación</strong> 🤯😎
        <br />
      </h1>
      <p className='margin-b-0 body-regular'>
        ¡Hola! Te cuento sobre mi aplicación de Rick y Morty. Es una plataforma en línea donde puedes explorar el
        universo de la popular serie animada. A través de mi aplicación, puedes descubrir personajes, ver sus imágenes y
        obtener información detallada sobre ellos. Además, puedes buscar episodios, ubicaciones y más en la base de
        datos de la serie. Con mi aplicación, tendrás todo lo que necesitas para explorar el universo de Rick y Morty de
        una manera sencilla y emocionante. ¡Espero que disfrutes explorando todo lo que tengo que ofrecer!
        <br />
      </p>
    </section>
  )
}

function TecnologiasUtilizadas() {
  return (
    <section
      id={styles['seccion-tecnologias']}
      className='d-flex flex-column justify-content-center align-items-center align-content-center padding-t1'
    >
      <h1 className='text-center titulo1-regular margin-b-60 span-100'>
        Tecnologías <strong>&nbsp;utilizadas</strong>
      </h1>

      <div id={styles['grid']}>
        {Tecnologias.map((tecnologia) => (
          <div key={tecnologia.id} className='d-flex flex-column' style={{ gap: 8 }}>
            <div className='d-flex justify-content-start align-items-center' style={{ gap: 14 }}>
              <Image
                src={tecnologia.imagen}
                alt={tecnologia.titulo}
                style={{ width: 50, height: 50 }}
                width={50}
                height={50}
              />
              <h1 className='margin-b-0 titulo3-bold'>{tecnologia.titulo} </h1>
            </div>
            <p className='body-regular color-body'>
              {tecnologia.descripcion}
              <br />
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
