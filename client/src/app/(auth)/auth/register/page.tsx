import { Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: 'Registro | Rick y Morty | Thomas Barenghi',
  description: 'Registro | Rick y Morty | Thomas Barenghi',
  themeColor: '#379c35'
}

export default function Register() {
  return <Content />
}
