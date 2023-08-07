import React from "react";
import { HeaderDefault, Footer } from "@/components";
import Querier from "@/services/querier";
import SecurityHOC from "@/services/securityHoc";

export default function RootLayout(props: any) {
  return (
    <>
    <SecurityHOC>
      <Querier>
        <HeaderDefault />
        <main>{props.children}</main>
        <Footer />
      </Querier>
    </SecurityHOC>
    </>
  );
}
