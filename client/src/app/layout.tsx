"use client";
import "./globals.scss";
import "./bootstrap.min.css";
import React from "react";
import Provider from "@/services/provider";

export default function RootLayout(props: any) {
  return (
    <html lang="es">
      <head></head>
      <body className="">
        <Provider>{props.children}</Provider>
      </body>
    </html>
  );
}