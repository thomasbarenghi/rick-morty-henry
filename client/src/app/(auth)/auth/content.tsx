"use client";
import React, { useRef, useState } from "react";
import style from "../page.module.scss";
import { Input } from "@/components";
import { toast } from "sonner";
import useValidate from "@/hooks/useValidate";
import { useAppDispatch } from "@/redux/hooks";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { login } from "@/redux/slices/authSession";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeroSection() {
  const router = useRouter();
  const validate = useValidate();
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState({
    email: null,
    password: null,
  });
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef<HTMLFormElement>(null);

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
      const { payload, meta } = await submitManager({
        e,
        formRef,
        formValues,
        errors,
        dispatch,
        actionToDispatch: login,
        setFormValues,
      });
      if (meta.requestStatus === "fulfilled") {
        router.push(
          `/?id=${payload?.User?.userId}&status=ok&session=${payload?.SessionID}&loginMethod=local`,
        );
      }
      // router.push(
      //   `/?id=${payload?.User?.userId}&status=ok&session=${payload?.SessionID}&loginMethod=local`
      // );
    } catch (error) {
      console.error(error);
      toast.error("Verifica los campos del formulario");
    }
  };

  return (
    <>
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
        ref={formRef}
      >
        <Input
          renderType="input"
          label="Correo electrónico"
          name="email"
          type="text"
          handleChange={handleChange}
          error={errors.email}
        />
        <Input
          renderType="input"
          type="password"
          label="Contraseña"
          name="password"
          handleChange={handleChange}
          error={errors.password}
        />
        <button
          id={style["submit"]}
          className="btn btn-primary btn1-t1 btn1"
          type="submit"
        >
          Iniciar sesión
        </button>
        <Link
          className="body-regular color-body margin-b-40 text-center"
          href="/auth/register"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </form>
    </>
  );
}
