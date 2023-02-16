import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import HeaderDefault from '../../componentes/masters/header/HeaderDefault';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacter } from '../../redux/actions/actions';
import style from "./personajedetail.module.scss";
import { useLocation } from 'react-router-dom';
export default function CharacterDetail() {

    const dispatch = useDispatch();
    const slug = useParams();

    const state = useSelector((state) => state?.personajes);
    useEffect(() => { dispatch(getCharacter(slug.id)); }, [slug]);

    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <Helmet>
                <title>Rick y Morty | Thomas Barenghi</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#379c35"></meta>
            </Helmet>
            <main>
                <HeaderDefault searchStatus={false} />
                <HeroSection state={state} />
                <DetallesSection state={state} />
            </main>
        </>
    )
}

function HeroSection({ state }) {
    return (
        <>
            <section
                id={style["seccion-hero"]}
                className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-grid d-xxl-grid flex-column-reverse justify-content-center align-items-center flex-sm-column-reverse flex-md-column-reverse flex-lg-row padding-t1"
            >
                <div
                    className="text-center text-sm-center text-md-start d-flex flex-column justify-content-center align-items-center flex-sm-column flex-md-row"
                    style={{ paddingTop: 15, gap: 16 }}
                >
                    <img id={style["img-hero"]} src={state?.personajeDetail?.image} />
                    <div>
                        <h1 id={style["titulo-hero"]} className="titulo1-regular margin-b-0">
                            <strong>{state?.personajeDetail?.name}</strong>
                        </h1>
                        <p className="body-regular margin-b-0 span-100">
                            {state?.personajeDetail?.gender} | {state?.personajeDetail?.species} | {state?.personajeDetail?.status}
                            <br />
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

function DetallesSection({ state }) {

    const [about, setAbout] = useState([])

    useEffect(() => {
        setAbout([
            {
                title: "Origen",
                icon: "/img/fi-br-rocket.svg",
                description: state?.personajeDetail?.origin?.name
            },
            {
                title: "Ultima ubicación",
                icon: "/img/fi-br-marker.svg",
                description: state?.personajeDetail?.location?.name
            }
        ])
    }, [state?.personajeDetail])

    console.log("about", about)

    return (
        <>
            <section
                id={style["seccion-tecnologias"]}
                className="d-flex flex-column justify-content-center align-items-center align-content-center padding-t1"
            >
                <h1 className="text-center titulo1-regular margin-b-60 span-100">
                    Sobre este <strong>personaje </strong>🥳
                    <br />
                </h1>
                <div id={style["grid"]} style={{ width: "100%" }}>

                    {about.length > 0 &&
                        <>
                            {
                                about.map((item) => {
                                    return (
                                        <div key={item?.title} id={style["item"]} className="d-flex flex-column item-t1">
                                            <div
                                                className="d-flex flex-column justify-content-start align-items-start flex-sm-column align-items-sm-start flex-md-row align-items-md-start align-items-lg-center"
                                                style={{ gap: 14 }}
                                            >
                                                <img id={style["item-icon"]} src={item.icon} width={50} height={50} />
                                                <h1 className="margin-b-0 titulo3-regular">
                                                    <strong>{item.title}:</strong> {item.description}
                                                    <br />
                                                </h1>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    }


                </div>
            </section>
        </>
    )
}