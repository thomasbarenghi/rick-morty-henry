import React from 'react'
import { HeaderDefault, Footer } from '@/components'
import Querier from '@/context/providers/querier.provider'
import SecurityHOC from '@/context/providers/hoc.provider'

interface Props {
  children: React.ReactNode
}

const GeneralLayout = (props: Props) => (
  <SecurityHOC>
    <Querier>
      <HeaderDefault />
      <main>{props.children}</main>
      <Footer />
    </Querier>
  </SecurityHOC>
)

export default GeneralLayout
