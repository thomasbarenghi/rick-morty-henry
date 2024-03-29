import Image from 'next/image'
import style from './modal.module.scss'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
  name: string
}

const Modal = ({ children }: ModalProps) => (
  <div id={style.modal} className={`${style.invisible} d-flex flex-column item-t1`}>
    <div id={style.modalInner} className='d-flex flex-column item-t1'>
      <div className='d-flex flex-row justify-content-between align-items-center align-content-center'>
        <h1 className='subtitulo-bold margin-b-0' style={{ fontSize: 18, color: 'black' }}>
          Filtros
        </h1>
        <Image
          id='close-button'
          alt='close-button'
          src='/img/fi-br-cross-green.svg'
          style={{ width: 15, height: 15 }}
          width={15}
          height={15}
        />
      </div>
      {children}
    </div>
  </div>
)

export default Modal
