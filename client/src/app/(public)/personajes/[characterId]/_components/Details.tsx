import style from '../page.module.scss'
import Image from 'next/image'

const Details = ({ state }: any) => {
  const data = [
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
  ]

  return (
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
          data.map((item: any) => (
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
  )
}

export default Details
