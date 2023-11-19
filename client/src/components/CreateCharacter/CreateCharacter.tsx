import styles from './createCharacter.module.scss'
import { useAppDispatch } from '@/redux/hooks'
import { createCharacter } from '@/redux/slices/client/characters'
import { Input, SimpleSelect } from '@/components'
import { characterOptions as options } from '@/utils/constants'
import { toast } from 'sonner'
import Image from 'next/image'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { titlePattern, websitePattern } from '@/utils/constants/pattern.const'

interface CreateProps {
  handleCreateVisibility: (e: boolean) => void
}

const CreateCharacter = ({ handleCreateVisibility }: CreateProps) => {
  const dispatch = useAppDispatch()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<any>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const { meta } = await dispatch(createCharacter(data))
      if (meta.requestStatus === 'fulfilled') {
        handleCreateVisibility(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Verifica los campos del formulario')
    }
  }

  return (
    <section
      id={styles['crear-personaje']}
      className='d-flex flex-row justify-content-start align-items-stretch padding-lr-t1 padding-tb-t1'
    >
      <div id={styles['crear-personaje_inner']} className='item-t1'>
        <div id={styles.inner_grid} className='d-xl-grid d-xxl-grid flex-row align-items-start item-t1'>
          <div id={styles.grid_col1}>
            <h1 className='titulo3-bold margin-b-24'>Creemos un personaje 🚀</h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              id='form'
              className='d-flex flex-column'
              style={{ gap: '8px !important' }}
            >
              <div className='d-flex flex-column flex-sm-column flex-md-row form-group' style={{ gap: 8 }}>
                <Input
                  label='Nombre del personaje'
                  name='name'
                  required
                  type='text'
                  hookForm={{
                    register,
                    validations: {
                      pattern: {
                        value: titlePattern.value,
                        message: titlePattern.message
                      },
                      required: { value: true, message: 'Este campo es requerido' }
                    }
                  }}
                  error={errors.name?.message?.toString()}
                />
                <SimpleSelect
                  options={options.species}
                  label='Especie'
                  name='species'
                  error={errors.species?.message?.toString()}
                />
              </div>
              <div className='d-flex flex-column flex-md-row form-group' style={{ gap: 8 }}>
                <SimpleSelect
                  options={options.gender}
                  label='Genero'
                  name='gender'
                  error={errors.gender?.message?.toString()}
                />
                <SimpleSelect
                  options={options.origin}
                  label='Origen'
                  name='origin_name'
                  error={errors.origin_name?.message?.toString()}
                />
              </div>
              <div className='d-flex flex-column flex-md-row form-group' style={{ gap: 8 }}>
                <SimpleSelect
                  options={options.origin}
                  label='Ultima ubicacion'
                  name='location_name'
                  error={errors.location_name?.message?.toString()}
                />
                <Input
                  label='Link imagen'
                  name='image'
                  type='text'
                  hookForm={{
                    register,
                    validations: {
                      pattern: {
                        value: websitePattern.value,
                        message: websitePattern.message
                      },
                      required: { value: true, message: 'Este campo es requerido' }
                    }
                  }}
                  error={errors.image?.message?.toString()}
                />
              </div>
              <div className='d-flex flex-column flex-md-row form-group' style={{ gap: 8 }}>
                <SimpleSelect
                  options={options.status}
                  label='Estatus'
                  name='status'
                  error={errors.status?.message?.toString()}
                />
              </div>

              <button id='submit' className='btn btn-primary btn1-t1 btn1' type='submit'>
                Crear personaje
              </button>
            </form>
          </div>
          <div
            id={styles.grid_col2}
            className='d-none d-xl-flex d-xxl-flex justify-content-center align-items-center align-items-lg-center'
          >
            {/* <Preview formData={formValues} /> */}
          </div>
        </div>
        <Image
          alt='close'
          id='closeMenu-1'
          className=''
          src='/img/fi-rr-cross.svg'
          style={{
            zIndex: 5,
            position: 'absolute',
            top: 20,
            right: 20,
            width: 15,
            height: 15
          }}
          onClick={(e) => {
            handleCreateVisibility(false)
          }}
          width={24}
          height={24}
        />
      </div>
    </section>
  )
}

export default CreateCharacter
