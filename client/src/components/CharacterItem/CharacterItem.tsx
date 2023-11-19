import style from './characterItem.module.scss'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { manageFavoriteCharacter } from '@/redux/slices/client/favorites'
import { deleteCharacter } from '@/redux/slices/client/characters'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import Image from 'next/image'

interface CharacterItemProps {
  data: any
}

const CharacterItem = ({ data }: CharacterItemProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const favoritosList = useAppSelector((state) => state?.client?.favorites?.characters)
  const { auth, session } = useAppSelector((state) => state?.authSession)
  const idFavorito = favoritosList?.some((obj) => obj?.id === data?.id) || false
  const ref = useRef<HTMLDivElement>(null)

  const handleFavorite = (data: any) => {
    dispatch(manageFavoriteCharacter(data))
  }

  const handleDelete = (id: any) => {
    dispatch(deleteCharacter(data))
  }

  const handleClick = () => {
    router.push(`/personajes/${data.id}`)
  }

  return (
    <>
      {data && (
        <div ref={ref} key={data.id} style={{ position: 'relative' }} id={style.componente} className='item-t1'>
          <div id={style['btns-todos-box']} className='d-flex justify-content-end'>
            {auth?.isLogged && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleFavorite(data)
                }}
                className={`d-flex justify-content-center align-items-center btn1  ${style['btn-blanco-verde']}`}
                type='button'
              >
                {idFavorito && <img width={20} height={20} src='/img/fi-br-heart-colored.svg' />}
                {!idFavorito && <img src='/img/fi-br-heart.svg' />}
              </button>
            )}
          </div>
          <div onClick={handleClick}>
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
          </div>
          {data?.userId !== 1 && data?.userId === session?.current?.id && auth?.isLogged && (
            <button
              className='btn btn-primary btn1 btn1-t1'
              type='button'
              onClick={() => {
                handleDelete(data.id)
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default CharacterItem
