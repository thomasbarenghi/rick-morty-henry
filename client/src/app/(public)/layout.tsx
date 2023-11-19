import React from 'react'
import { HeaderDefault, Footer } from '@/components'
import Querier from '@/services/querier'
import SecurityHOC from '@/services/securityHoc'

const GeneralLayout = (props: any) => (
  <>
    <SecurityHOC>
      <Querier>
        <HeaderDefault />
        <main>{props.children}</main>
        <Footer />
      </Querier>
    </SecurityHOC>
  </>
)

export default GeneralLayout
