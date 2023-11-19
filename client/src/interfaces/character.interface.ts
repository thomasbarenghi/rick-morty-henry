export interface Character {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Location
  location: Location
  image: string
  episode: string[]
  url: string
  created: Date
  location_name: string
  origin_name: string
  userId?: number
}

export interface Location {
  name: string
  url: string
}
