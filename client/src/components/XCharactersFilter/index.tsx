import style from './index.module.scss'
import { Input } from '@/components'
import { characterOptions, orderOptions } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setFilterGender, setFilterOrder, setFilterSpecies, resetFilters } from '@/redux/slices/client/filters'
import Image from 'next/image'

interface ModalProps {
  handleVisibility: (data: boolean) => void
}
const ChatactersFilter = ({ handleVisibility }: ModalProps) => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state?.client?.filters)
  const handleFilter = (event: any) => {
    const { name, value } = event
    name === 'species'
      ? dispatch(setFilterSpecies(value))
      : name === 'gender'
        ? dispatch(setFilterGender(value))
        : name === 'order'
          ? dispatch(setFilterOrder(value))
          : null
  }

  const handleRestoreFilter = async () => {
    await dispatch(resetFilters())
    handleVisibility(false)
  }

  return (
    <div id={style.modal} className={`${style.visible} d-flex flex-column item-t1`}>
      <div id={style.modalInner} className='d-flex flex-column item-t1'>
        <div className='d-flex flex-row justify-content-between align-items-center align-content-center'>
          <h1 className='subtitulo-bold margin-b-0' style={{ fontSize: 18, color: 'black' }}>
            Filtros
          </h1>
          <Image
            onClick={() => {
              handleVisibility(false)
            }}
            id='close-button'
            alt='close-button'
            src='/img/fi-br-cross-green.svg'
            style={{ width: 15, height: 15 }}
            width={15}
            height={15}
          />
        </div>
        <div id='modalInner'>
          <Input
            renderType='select'
            name='gender'
            handleChange={(e: any) => {
              e.name = 'gender'
              handleFilter(e)
            }}
            selectOptions={characterOptions.gender}
            label='Genero'
            selectValue={characterOptions.gender.find((e: any) => e.value === filters.gender)}
            customClass='mt-1'
            error=''
          />
          <Input
            renderType='select'
            name='species'
            handleChange={(e: any) => {
              e.name = 'species'
              handleFilter(e)
            }}
            selectOptions={characterOptions.species}
            selectValue={characterOptions.species.find((e: any) => e.value === filters.species)}
            label='Especie'
            value='default'
            customClass='mt-1'
            error=''
          />
          <Input
            renderType='select'
            name='order'
            selectValue={orderOptions.name.find((e: any) => e.value === filters.order)}
            handleChange={(e: any) => {
              e.name = 'order'
              handleFilter(e)
            }}
            selectOptions={orderOptions.name}
            label='Orden por nombre'
            value='default'
            customClass='mt-1'
            error=''
          />

          <button
            style={{
              marginTop: '16px',
              borderRadius: '10px !important'
            }}
            className={`${style.btn3} btn btn-primary btn1 btn1-t1`}
            onClick={handleRestoreFilter}
          >
            Restaurar filtros
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatactersFilter
