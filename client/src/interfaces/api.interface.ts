/* eslint-disable @typescript-eslint/indent */

export interface Response<T> {
  data: T | null
  error: GeneralError
}

export type GeneralError =
  | {
      message: string
      code: number
    }
  | null
  | undefined

export interface GetRequestParams {
  path: string
  cache?: 'default' | 'no-store' | 'reload' | 'force-cache' | 'only-if-cached'
  tags?: string[]
  revalidate?: number
  customUrl?: string
}

export interface MutationRequestParams {
  method: HttpMethod
  path: string
  body?: any
  headers?: any
  customUrl?: string
}

export type HttpMethod = 'post' | 'put' | 'delete' | 'patch'

export type OrderType = 'active' | 'finished' | 'all'

export interface GetOrdersRequest {
  type: OrderType
  mode: 'shop' | 'user'
}
