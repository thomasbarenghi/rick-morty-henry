import { getRequest } from '@/services/apiRequest.service'
import { type Character, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const getCharacters = async (): Promise<Response<Character[]>> => {
  const response = await getRequest<any[]>({
    path: Endpoints.CHARACTERS,
    cache: 'force-cache'
  })

  const data = response?.data as any
  response.data = data.results as Character[]

  if (response?.error) {
    console.error(response?.error)
  }

  return response
}
