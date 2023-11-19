import './globals.scss'
import './bootstrap.min.css'
import ReduxProvider from '@/context/providers/redux.provider'
import { Toaster } from 'sonner'

const RootLayout = (props: any) => (
  <html lang='es'>
    <head />
    <body className=''>
      <ReduxProvider>
        <>
          <Toaster
            richColors
            position='bottom-left'
            toastOptions={{
              className: 'max-w-[85vw] xs:max-w-none z-50 '
            }}
          />
          {props.children}
        </>
      </ReduxProvider>
    </body>
  </html>
)

export default RootLayout
