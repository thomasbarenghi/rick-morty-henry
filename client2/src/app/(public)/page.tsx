
import { Metadata } from "next";
//import { HeaderDefault } from "@/components";
import style from "./page.module.scss";

export const metadata: Metadata = {
  title: "Rick y Morty | Thomas Barenghi",
  description: "Rick y Morty | Thomas Barenghi",
  themeColor: "#379c35",
};

export default function Home() {
  const cerrarModal = (e: any) => {
    if (e.target.id === "openModal" || e.target.closest("#modalInner")) {
      return;
    }
    //hideHeader(false, "all");
  };

  const scrollToSection = () => {};

  return (
    <>
      <main >
        <HeroSection  />

      </main>
    </>
  );
}



function HeroSection({  }) {
  return (
    <section
      id={style["seccion-hero"]}
      className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-grid d-xxl-grid flex-column-reverse justify-content-start align-items-center flex-sm-column-reverse flex-md-column-reverse flex-lg-row padding-t1"
    >
      <div>
        <h1 className="titulo1-regular">
          Descubre las aventuras de <strong>Rick y Morty</strong>
          <br />
        </h1>
        <p className="body-regular margin-b-24">
          ¿Estás listo para sumergirte en un mundo lleno de locura, humor negro
          y aventuras intergalácticas? Entonces no te pierdas las aventuras de
          Rick y Morty.
          <br />
        </p>
        <button
          className="btn btn-primary btn1 btn1-t1"
          type="button"
       
        >
          Conoce a los personajes
          <br />
        </button>
      </div>
      <div className="d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-end justify-content-xl-end justify-content-xxl-end">
        <img id={style["hero-img"]} src="/img/Group 3.svg" />
      </div>
    </section>
  );
}
