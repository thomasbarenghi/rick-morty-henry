'use client'
import style from '../../page.module.scss'
import { Input } from '@/components'
import { toast } from 'sonner'
import { useAppDispatch } from '@/redux/hooks'
import { register as registerAction } from '@/redux/slices/authSession'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { emailPattern, firstNamePattern, lastNamePattern, passwordPattern } from '@/utils/constants/pattern.const'
import { type RegisterFormData } from '@/interfaces/forms.interfaces'

const Form = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<RegisterFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const { meta } = await dispatch(registerAction({ email: data.email, password: data.password }))
      if (meta.requestStatus === 'fulfilled') {
        router.push('/auth')
      }
    } catch (error) {
      console.error(error)
      toast.error('Verifica los campos del formulario')
    }
  }

  return (
    <>
      <div style={{ width: '100%' }}>
        <h1 className='titulo2-regular margin-b-0'>
          Bienvenido <strong />
          <br />
        </h1>
        <p className='body-regular color-body margin-b-20'>
          Registrate para disfrutar de Rick y Morty
          <br />
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} id='form' className='d-flex flex-column'>
        <Input
          label='Nombre'
          name='firstName'
          type='text'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: firstNamePattern.value,
                message: firstNamePattern.message
              },
              required: { value: true, message: 'Este campo es requerido' }
            }
          }}
          error={errors.firstName?.message?.toString()}
        />
        <Input
          label='Apellido'
          name='lastName'
          type='text'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: lastNamePattern.value,
                message: lastNamePattern.message
              },
              required: { value: true, message: 'Este campo es requerido' }
            }
          }}
          error={errors.lastName?.message?.toString()}
        />
        <Input
          label='Correo electrónico'
          name='email'
          type='text'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: emailPattern.value,
                message: emailPattern.message
              },
              required: { value: true, message: 'Este campo es requerido' }
            }
          }}
          error={errors.email?.message?.toString()}
        />
        <Input
          type='password'
          label='Contraseña'
          name='password'
          hookForm={{
            register,
            validations: {
              pattern: {
                value: passwordPattern.value,
                message: passwordPattern.message
              },
              required: { value: true, message: 'Este campo es requerido' }
            }
          }}
          error={errors?.password?.message?.toString()}
        />
        <button id={style.submit} className='btn btn-primary btn1-t1 btn1' type='submit'>
          Registrarse
        </button>
        <Link className='body-regular color-body margin-b-40 text-center' href='/auth'>
          ¿Ya tienes una cuenta? Ingresa
        </Link>
      </form>
    </>
  )
}

export default Form
