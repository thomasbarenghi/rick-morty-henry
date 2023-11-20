'use client'
import { type ReactNode, useEffect } from 'react'
import { usePathname, useParams } from 'next/navigation'
import { useAppDispatch } from '@/redux/hooks'
import { getCharacters, getCharacterById } from '@/redux/slices/client/characters'

interface Props {
  children: ReactNode
}

const Querier = ({ children }: Props) => {
  const pathname = usePathname()
  const params = useParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (pathname === '/') {
      dispatch(getCharacters())
    }

    if (params?.characterId) {
      dispatch(getCharacterById(params?.characterId.toString()))
    }
  }, [pathname])

  return <>{children}</>
}

export default Querier
