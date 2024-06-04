import Link from 'next/link'
import { Routes } from '@/utils/constants'

const Nav = () => (
  <div id='nav' className='list-inline d-none d-lg-flex' style={{ gap: 30, color: '#ffffff', margin: 0 }}>
    <Link href={Routes.HOME} className='list-inline-item body-regular'>
      Inicio
    </Link>
    <Link href={Routes.ABOUT} className='list-inline-item body-regular'>
      Acerca de
    </Link>
  </div>
)

export default Nav
