import Link from 'next/link'
import { Routes } from '@/utils/constants'
import { useAppSelector } from '@/redux/hooks'

const Nav = () => {
  const auth = useAppSelector((state) => state.authSession.auth)
  return (
    <div id='nav' className='list-inline d-none d-lg-flex' style={{ gap: 30, color: '#ffffff', margin: 0 }}>
      <Link href={Routes.HOME} className='list-inline-item body-regular'>
        Inicio
      </Link>
      <Link href={Routes.ABOUT} className='list-inline-item body-regular'>
        About
      </Link>
      <Link href={auth.isLogged ? Routes.LOGOUT : Routes.LOGIN} className='list-inline-item body-regular'>
        {auth.isLogged ? 'Cerrar sesion' : 'Iniciar sesion'}
      </Link>
    </div>
  )
}

export default Nav
