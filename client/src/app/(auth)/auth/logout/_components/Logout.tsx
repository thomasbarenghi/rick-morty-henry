'use client'
import { useAppDispatch } from '@/redux/hooks'
import { logout } from '@/redux/slices/authSession'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    dispatch(logout())
    router.push('/auth')
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <h1 className='titulo2-regular margin-b-0'>
        Saliendo de <strong>Rick y morty</strong>
        <br />
      </h1>
      <p className='body-regular color-body margin-b-20'>
        Aguarda un momento...
        <br />
      </p>
    </div>
  )
}

export default Logout
