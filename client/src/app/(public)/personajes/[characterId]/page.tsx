import { type Metadata } from 'next'
import Hero from './_components/Hero'
import Details from './_components/Details'

export const metadata: Metadata = {
  title: 'Personaje | Rick y Morty | Thomas Barenghi',
  description: 'Personaje | Rick y Morty | Thomas Barenghi'
}

const Page = ({ params }: { params: { characterId: string } }) => (
  <>
    <Hero />
    <Details />
  </>
)

export default Page
