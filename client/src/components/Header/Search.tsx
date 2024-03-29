'use client'
import style from './index.module.scss'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSearch } from '@/redux/slices/client/filters'
import Image from 'next/image'

const Search = () => {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state?.client?.filters?.search)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value))
  }

  return (
    <div id={style['search-div']} className='flex'>
      <Image src='/img/fi-br-search.svg' alt='search' width={20} height={20} />
      <input
        id={style['search-input']}
        className='body-regular margin-b-0'
        type='search'
        value={search}
        placeholder='Buscar un personaje'
        name='search'
        onChange={handleSearch}
      />
    </div>
  )
}

export default Search
