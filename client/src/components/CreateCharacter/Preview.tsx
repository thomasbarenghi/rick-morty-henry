import Image from 'next/image'
import styles from './createCharacter.module.scss'
import { type UseFormWatch } from 'react-hook-form'

interface PreviewProps {
  watch: UseFormWatch<any>
}

const Preview = ({ watch }: PreviewProps) => (
  <div id={styles.col2_component} className='d-grid item-t1'>
    <div style={{ position: 'relative', height: '100%' }}>
      <img alt='image' id={styles.component_img} src={watch('image')} width={238} height={263} />
    </div>
    <div style={{ height: 'max-content', width: '100%' }}>
      <h1 id={styles.component_titulo} className='titulo3-bold'>
        {watch('name')}
      </h1>
      <div id={styles['box-propiedades']} className='d-flex margin-b-24'>
        <div id={styles['box-propiedades_item']} className='d-flex flex-row justify-content-start align-items-center'>
          <Image src='/img/especie.svg' width={20} height={20} alt='especie' />
          <p className='smallText-regular margin-b-0'>{watch('species')} </p>
        </div>
        <div id={styles['box-propiedades_item']} className='d-flex flex-row justify-content-start align-items-center'>
          <Image src='/img/especie.svg' width={20} height={20} alt='especie' />
          <p className='smallText-regular margin-b-0'>{watch('gender')}</p>
        </div>
      </div>
    </div>
  </div>
)

export default Preview
