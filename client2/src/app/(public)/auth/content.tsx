"use client";
import React, { useRef, useState } from "react";
import style from "./page.module.scss";
import { Input } from "@/components";
import { toast } from "sonner";
import useValidate from "@/hooks/useValidate";
import { useAppDispatch } from "@/redux/hooks";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { login } from "@/redux/slices/authSession";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const validate = useValidate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.target);
    changeManager({
      e,
      setFormValues,
      setErrors,
      validate,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await submitManager({
        e,
        formRef,
        formValues,
        errors,
        dispatch,
        actionToDispatch: login,
        setFormValues,
      });
    } catch (error) {
      console.error(error);
      toast.error("Verifica los campos del formulario");
    }
  };

  return (
    <>
      <section
        id={style["seccion-hero"]}
        className="d-flex d-sm-flex d-md-flex d-lg-grid d-xl-grid d-xxl-grid flex-column justify-content-start align-items-center flex-sm-column justify-content-sm-start flex-md-column justify-content-md-start flex-lg-column justify-content-lg-start justify-content-xl-center align-items-xl-center justify-content-xxl-center align-items-xxl-center"
      >
        <div id={style["col1"]} />
        <div
          id={style["col2"]}
          className="d-flex flex-column justify-content-center align-items-start align-items-sm-start"
        >
          <div style={{ width: "100%" }}>
            <h1 className="titulo2-regular margin-b-0">
              Bienvenido <strong>de nuevo</strong>
              <br />
            </h1>
            <p className="body-regular color-body margin-b-40">
              Comienza a disfrutar Rick y Morty
              <br />
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            id="form"
            className="d-flex flex-column"
          >
            <Input
              renderType="input"
              label="Correo electrónico"
              name="email"
              type="text"
              handleChange={handleChange}
            />
            <Input
              renderType="input"
              type="password"
              label="Contraseña"
              name="password"
              handleChange={handleChange}
            />
            <button
              id={style["submit"]}
              className="btn btn-primary btn1-t1 btn1"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
