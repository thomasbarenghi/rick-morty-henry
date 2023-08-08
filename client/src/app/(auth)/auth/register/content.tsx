"use client";
import React, { useRef, useState } from "react";
import style from "../../page.module.scss";
import { Input } from "@/components";
import { toast } from "sonner";
import useValidate from "@/hooks/useValidate";
import { useAppDispatch } from "@/redux/hooks";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { register } from "@/redux/slices/authSession";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeroSection() {
  const dispatch = useAppDispatch();
  const validate = useValidate();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: null,
    lastName: null,
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
        actionToDispatch: register,
        setFormValues,
      });
      if (meta.requestStatus === "fulfilled") {
        router.push(`/auth`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Verifica los campos del formulario");
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <h1 className="titulo2-regular margin-b-0">
          Bienvenido <strong></strong>
          <br />
        </h1>
        <p className="body-regular color-body margin-b-20">
          Registrate para disfrutar de Rick y Morty
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
          label="Nombre"
          name="firstName"
          type="text"
          handleChange={handleChange}
          error={errors.firstName}
        />
        <Input
          renderType="input"
          label="Apellido"
          name="lastName"
          type="text"
          handleChange={handleChange}
          error={errors.lastName}
        />
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
          Registrarse
        </button>
        <Link
          className="body-regular color-body margin-b-40 text-center"
          href="/auth"
        >
          ¿Ya tienes una cuenta? Ingresa
        </Link>
      </form>
    </>
  );
}