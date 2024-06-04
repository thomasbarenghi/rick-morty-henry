import './globals.scss'
import './bootstrap.min.css'
import { Toaster } from 'sonner'
import { Footer, HeaderDefault } from '@/components'

interface Props {
  children: React.ReactNode
}

const RootLayout = (props: Props) => (
  <html lang='es'>
    <head />
    <body className=''>
      <HeaderDefault />
      <Toaster richColors style={{ zIndex: 40 }} />
      {props.children}
      <Footer />
    </body>
  </html>
)

export default RootLayout
