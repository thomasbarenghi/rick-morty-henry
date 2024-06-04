export interface Technology {
  id: number
  title: string
  image: string
  description: string
}

export const technologies: Technology[] = [
  {
    id: 1,
    title: 'NextJS',
    image: '/img/tecnologias/next.svg',
    description:
      'Next.js es un framework de React que permite crear aplicaciones web y sitios web estáticos. Next.js proporciona una serie de características que facilitan el desarrollo de aplicaciones web y sitios web estáticos, como el enrutamiento automático, la generación de páginas estáticas y la renderización del lado del servidor.'
  },
  {
    id: 2,
    title: 'Typescript',
    image: '/img/tecnologias/typescript.svg',
    description: 'TypeScript es un lenguaje de programación de código abierto desarrollado y mantenido por Microsoft.'
  },
  {
    id: 6,
    title: 'Sass',
    image: '/img/tecnologias/sass.svg',
    description:
      'Sass es un preprocesador de CSS que permite escribir código CSS de manera más eficiente y estructurada. Con Sass, puedes utilizar variables, anidamiento de selectores, mixins, funciones y operadores matemáticos, lo que facilita la escritura y el mantenimiento de hojas de estilo. Además, Sass permite la creación de archivos parciales que se pueden importar en otros archivos para una mayor modularidad y reutilización de código.'
  },
  {
    id: 8,
    title: 'Bootstrap',
    image: '/img/tecnologias/bootstrap.svg',
    description:
      'Bootstrap es un framework de diseño web que proporciona una serie de herramientas y componentes predefinidos basados en HTML, CSS y JavaScript. Con Bootstrap, puedes crear fácilmente páginas web responsivas y adaptables a diferentes dispositivos y resoluciones. Bootstrap te permite aprovechar al máximo los recursos de CSS, con una variedad de clases y estilos predefinidos que facilitan la creación de diseños atractivos y funcionales en poco tiempo.'
  },
  {
    id: 7,
    title: 'Figma',
    image: '/img/tecnologias/figma.svg',
    description:
      'Figma es una herramienta de diseño de interfaz de usuario (UI) basada en la nube que permite a los diseñadores y equipos de diseño colaborar en tiempo real. Figma cuenta con una interfaz intuitiva y fácil de usar que permite crear diseños, prototipos y animaciones interactivas. Figma también ofrece una amplia variedad de recursos, como iconos, componentes, plantillas y complementos, que facilitan la creación de diseños de alta calidad de manera más rápida y eficiente.'
  }
]
