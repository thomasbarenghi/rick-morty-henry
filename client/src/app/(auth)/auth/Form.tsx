'use client'
import style from '../page.module.scss'
import { Input } from '@/components'
import { toast } from 'sonner'
import { useAppDispatch } from '@/redux/hooks'
import { login } from '@/redux/slices/authSession'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { emailPattern, passwordPattern } from '@/utils/constants/pattern.const'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type LoginFormData } from '@/interfaces/forms.interfaces'

const Form = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<LoginFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const { payload, meta } = await dispatch(login({ email: data.email, password: data.password }))
      if (meta.requestStatus === 'fulfilled') {
        router.push(`/?id=${payload?.User?.userId}&status=ok&session=${payload?.SessionID}&loginMethod=local`)
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
          Bienvenido <strong>de nuevo</strong>
          <br />
        </h1>
        <p className='body-regular color-body margin-b-40'>
          Comienza a disfrutar Rick y Morty
          <br />
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} id='form' className='d-flex flex-column'>
        <Input
          label='Correo electrónico'
          name='email'
          type='text'
          error={errors.email?.message?.toString()}
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
        />
        <Input
          type='password'
          label='Contraseña'
          name='password'
          error={errors.password?.message?.toString()}
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
        />
        <button id={style.submit} className='btn btn-primary btn1-t1 btn1' type='submit'>
          Iniciar sesión
        </button>
        <Link className='body-regular color-body margin-b-40 text-center' href='/auth/register'>
          ¿No tienes una cuenta? Registrate
        </Link>
      </form>
    </>
  )
}

export default Form
