import style from "./index.module.scss";
import Link from "next/link";
import { Routes } from "@/constants";

type NavProps = {
  headerType: string;
};
export default function Nav({ headerType }: NavProps) {
  return (
    <>
      <div
        id="nav"
        className="list-inline d-none d-lg-flex"
        style={{ gap: 30, color: "#ffffff", margin: 0 }}
      >
        <Link href={Routes.HOME} className="list-inline-item body-regular">
          Inicio
        </Link>
        <Link href={Routes.ABOUT} className="list-inline-item body-regular">
          About
        </Link>
        <Link href={Routes.LOGOUT} className="list-inline-item body-regular">
          Cerrar sesión
        </Link>
      </div>
    </>
  );
}
