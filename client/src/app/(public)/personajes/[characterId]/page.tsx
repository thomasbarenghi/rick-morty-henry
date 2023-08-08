import Content from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personajes",
  description: "Personajes de Rick and Morty",
};

export default function Page({ params }: { params: { characterId: string } }) {
  return <Content />;
}
