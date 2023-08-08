import style from "./index.module.scss";
import Link from "next/link";
import { Routes } from "@/constants";

type NavProps = {
  searchStatus: boolean;
  headerType: string;
};
export default function Nav({ searchStatus, headerType }: NavProps) {
  const idLi = headerType === "alternative" ? style.navItem2 : style.navItem1;
  return (
    <>
      <div
        id="nav"
        className="list-inline d-none d-lg-flex"
        style={
          searchStatus === false
            ? { gap: 30, color: "#ffffff", margin: 0 }
            : {
                gap: 30,
                color: "#ffffff",
                margin: 0,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }
        }
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
