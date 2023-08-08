import style from "./index.module.scss";
export default function FooterDefault() {
  return (
    <>
      <footer id={style.footer} className="text-center padding-t1">
        <h1 className="subtitulo-regular margin-b-0">
          Rick &amp; Morty | Diseñado y desarrollado por Thomas Barenghi |
          thomasbarenghi@gmail.com
        </h1>
      </footer>
    </>
  );
}
