import { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Saliendo | Rick y Morty | Thomas Barenghi",
  description: "Saliendo | Rick y Morty | Thomas Barenghi",
  themeColor: "#379c35",
};

export default function Logout() {
  return <Content />;
}
