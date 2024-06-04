import { getRequest } from '@/services/apiRequest.service'
import { type Character, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'

export const getCharacter = async (characterId: string): Promise<Response<Character>> => {
  const response = await getRequest<any>({
    path: Endpoints.CHARACTER(characterId),
    cache: 'force-cache'
  })

  if (response?.error) {
    console.error(response?.error)
  }

  return response
}
