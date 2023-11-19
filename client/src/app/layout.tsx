import './globals.scss'
import './bootstrap.min.css'
import ReduxProvider from '@/context/providers/redux.provider'
import { Toaster } from 'sonner'

const RootLayout = (props: any) => (
  <html lang='es'>
    <head />
    <body className=''>
      <ReduxProvider>
        <Toaster richColors style={{ zIndex: 40 }} />
        {props.children}
      </ReduxProvider>
    </body>
  </html>
)

export default RootLayout
