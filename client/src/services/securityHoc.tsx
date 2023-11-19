'use client'
import { type ReactNode, useLayoutEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { setAuth, setSession, logout, verifySession as verifySessionX } from '@/redux/slices/authSession'
import { type Auth } from '@/interfaces'

interface Props {
  children: ReactNode
}

const SecurityHOC: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {
    session: { current: session },
    auth
  } = useAppSelector((state) => state.authSession)

  const loginMethodQy = searchParams.get('loginMethod') ?? ''
  const userIdQy = searchParams.get('id') ?? ''
  const statusQy = searchParams.get('status') ?? ''
  const sessionQy = searchParams.get('session') ?? ''
  const userId = session?.id || (userIdQy ?? '')
  const SessionID = auth?.sessionId || (sessionQy ?? '')

  const verifySession = async (data: Auth) => {
    try {
      if (data.isLogged && userId) {
        const verifData = await dispatch(verifySessionX(SessionID))
        if (verifData.meta.requestStatus === 'fulfilled') {
          console.log('Sesión válida')
          await setSessionFn()
          return true
        } else {
          console.log('Sesión no válida')
          dispatch(logout())
        }
      } else {
        console.log('Debes iniciar sesión primero')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const setSessionFn = async () => {
    await dispatch(setSession(userId as string))
  }

  const setAuthFn = async () => {
    const authObj: Auth = {
      isLogged: true,
      loginMethod: loginMethodQy,
      sessionId: SessionID
    }
    dispatch(setAuth(authObj))
    return authObj
  }

  const systemHoc = async () => {
    if (auth?.isLogged) {
      await verifySession(auth)
    } else if (!auth?.isLogged && loginMethodQy && userIdQy && statusQy && sessionQy) {
      const authData = await setAuthFn()
      await verifySession(authData)
    } else {
      console.log('No hay datos de autenticación')
    }
  }

  useLayoutEffect(() => {
    systemHoc()
  }, [])

  useLayoutEffect(() => {
    console.log('pathname', pathname)
    if ((pathname === '/auth' || pathname === '/auth/register') && auth?.isLogged) {
      router.push('/')
    }
  }, [pathname, auth?.isLogged, router])

  return <>{children}</>
}

export default SecurityHOC
