'use client'
import { Provider } from 'react-redux'
import store, { persistor } from '@/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import RedirectProvider from './redirect'

interface Props {
  children: React.ReactNode
}

export default function AppProvider({ children }: Props) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <RedirectProvider> */}
          <Toaster
            richColors
            position='bottom-left'
            toastOptions={{
              className: 'max-w-[85vw] xs:max-w-none z-50 '
            }}
          />
          {children}
          {/* </RedirectProvider> */}
        </PersistGate>
      </Provider>
    </>
  )
}
