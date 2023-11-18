import React from 'react'
import { HeaderDefault, Footer } from '@/components'
import Querier from '@/services/querier'
import SecurityHOC from '@/services/securityHoc'
import style from './page.module.scss'

export default function AuthLayout(props: any) {
  return (
    <>
      <SecurityHOC>
        <Querier>
          <HeaderDefault />
          <main>
            <section
              id={style['seccion-hero']}
              className='d-flex d-sm-flex d-md-flex d-lg-grid d-xl-grid d-xxl-grid flex-column justify-content-start align-items-center flex-sm-column justify-content-sm-start flex-md-column justify-content-md-start flex-lg-column justify-content-lg-start justify-content-xl-center align-items-xl-center justify-content-xxl-center align-items-xxl-center'
            >
              <div id={style['col1']} />
              <div
                id={style['col2']}
                className='d-flex flex-column justify-content-center align-items-start align-items-sm-start'
              >
                {props.children}
              </div>
            </section>
          </main>
          <Footer />
        </Querier>
      </SecurityHOC>
    </>
  )
}
