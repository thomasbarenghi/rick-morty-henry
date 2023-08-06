import React from "react";
import { HeaderDefault, Footer } from "@/components";
import Querier from "@/services/querier";

export default function RootLayout(props: any) {
  return (
    <>
      <Querier>
        <HeaderDefault />
        <main>{props.children}</main>
    <Footer /> 
      </Querier>
    </>
  );
}
