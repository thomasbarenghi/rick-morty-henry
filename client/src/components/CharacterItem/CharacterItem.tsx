import style from './characterItem.module.scss'
import Image from 'next/image'
import { type Character } from '@/interfaces/character.interface'
import Link from 'next/link'

interface CharacterItemProps {
  data: Character
}

const CharacterItem = ({ data }: CharacterItemProps) => (
  <>
    {data && (
      <div key={data.id} style={{ position: 'relative' }} id={style.componente} className='item-t1'>
        <Link href={`/personajes/${data.id}`}>
          <img id={style['personajes-img']} src={data.image} />
          <h1
            id='titulo'
            className='titulo3-bold'
            style={{
              fontSize: 20,
              paddingTop: 15,
              marginTop: 5,
              marginBottom: 10,
              paddingRight: 10,
              paddingLeft: 10
            }}
          >
            {data.name}
          </h1>
          <div id={style['box-propiedades']} className='d-flex margin-b-24'>
            <div className='d-flex flex-row justify-content-start align-items-center' style={{ gap: 8 }}>
              <Image src='/img/especie.svg' width={20} height={20} alt='especie' />
              <p className='smallText-regular margin-b-0'>{data.species} </p>
            </div>
            <div className='d-flex flex-row justify-content-start align-items-center' style={{ gap: 8 }}>
              <Image src='/img/fi-br-gender.svg' width={20} height={20} alt='especie' />
              <p className='smallText-regular margin-b-0'>{data.gender} </p>
            </div>
          </div>
        </Link>
      </div>
    )}
  </>
)

export default CharacterItem
