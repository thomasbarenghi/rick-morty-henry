import { useRef, useState } from "react";
import styles from "./index.module.scss";
import { useAppDispatch } from "@/redux/hooks";
import { createCharacter } from "@/redux/slices/client/characters";
import Preview from "./characterPreview";
import { Input } from "@/components";
import { characterOptions as options } from "@/constants";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import { toast } from "sonner";
import useValidate from "@/hooks/useValidate";
import { useRouter } from "next/navigation";
import Image from "next/image";

type CreateProps = {
  handleCreateVisibility: (e: boolean) => void;
};

export default function CreateCharacter({
  handleCreateVisibility,
}: CreateProps) {
  const [visibility, setVisibility] = useState(false);

  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const validate = useValidate();
  const [formValues, setFormValues] = useState({
    name: null,
    species: null,
    gender: null,
    origin_name: null,
    location_name: null,
    image: null,
    status: null,
  });
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    console.log("handleChange.target", e.target);
    changeManager({
      e,
      setFormValues,
      setErrors,
      validate,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement | any>) => {
    try {
      const { payload, meta } = await submitManager({
        e,
        formRef,
        formValues,
        errors,
        dispatch,
        actionToDispatch: createCharacter,
        setFormValues,
      });
      // router.push(
      //   `/?id=${payload?.User?.userId}&status=ok&session=${payload?.SessionID}&loginMethod=local`
      // );
      setVisibility(false);
      handleCreateVisibility(false);
    } catch (error) {
      console.error(error);
      toast.error("Verifica los campos del formulario");
    }
  };

  return (
    <section
      id={styles["crear-personaje"]}
      className="d-flex flex-row justify-content-start align-items-stretch padding-lr-t1 padding-tb-t1"
    >
      <div id={styles["crear-personaje_inner"]} className="item-t1">
        <div
          id={styles["inner_grid"]}
          className="d-xl-grid d-xxl-grid flex-row align-items-start item-t1"
        >
          <div id={styles["grid_col1"]}>
            <h1 className="titulo3-bold margin-b-24">
              Creemos un personaje 🚀
            </h1>

            <form
              onSubmit={handleSubmit}
              id="form"
              className="d-flex flex-column"
              style={{ gap: "8px !important" }}
              ref={formRef}
            >
              <div
                className="d-flex flex-column flex-sm-column flex-md-row form-group"
                style={{ gap: 8 }}
              >
                <Input
                  renderType="input"
                  label="Nombre del personaje"
                  name="name"
                  handleChange={handleChange}
                  required={true}
                  type="text"
                  error={errors.name}
                />
                <Input
                  renderType="select"
                  selectOptions={options.species}
                  label="Especie"
                  name="species"
                  handleChange={(e: any) =>
                    handleChange({
                      target: {
                        name: "species",
                        value: e.value,
                        type: "text",
                      },
                    })
                  }
                  required={true}
                  type="text"
                  error={errors.species}
                />
              </div>
              <div
                className="d-flex flex-column flex-md-row form-group"
                style={{ gap: 8 }}
              >
                <Input
                  renderType="select"
                  selectOptions={options.gender}
                  label="Genero"
                  name="gender"
                  handleChange={(e: any) =>
                    handleChange({
                      target: {
                        name: "gender",
                        value: e.value,
                        type: "text",
                      },
                    })
                  }
                  required={true}
                  type="text"
                  error={errors.gender}
                />
                <Input
                  renderType="select"
                  selectOptions={options.origin}
                  label="Origen"
                  name="origin_name"
                  handleChange={(e: any) => {
                    console.log(e);
                    setFormValues({ ...formValues, origin_name: e.value });
                  }}
                  required={true}
                  type="text"
                  error={errors.origin_name}
                />
              </div>
              <div
                className="d-flex flex-column flex-md-row form-group"
                style={{ gap: 8 }}
              >
                <Input
                  renderType="select"
                  selectOptions={options.origin}
                  label="Ultima ubicacion"
                  name="location_name"
                  handleChange={(e: any) => {
                    setFormValues({ ...formValues, location_name: e.value });
                  }}
                  required={true}
                  type="text"
                  error={errors.location_name}
                />
                <Input
                  renderType="input"
                  label="Link imagen"
                  name="image"
                  handleChange={handleChange}
                  required={true}
                  type="text"
                  error={errors.image}
                />
              </div>
              <div
                className="d-flex flex-column flex-md-row form-group"
                style={{ gap: 8 }}
              >
                <Input
                  renderType="select"
                  selectOptions={options.status}
                  label="Estatus"
                  name="status"
                  handleChange={(e: any) => {
                    setFormValues({ ...formValues, status: e.value });
                  }}
                  required={true}
                  type="text"
                  error={errors.status}
                />
              </div>

              <button
                id="submit"
                className="btn btn-primary btn1-t1 btn1"
                type="submit"
              >
                Crear personaje
              </button>
            </form>
          </div>
          <div
            id={styles["grid_col2"]}
            className="d-none d-xl-flex d-xxl-flex justify-content-center align-items-center align-items-lg-center"
          >
            <Preview formData={formValues} />
          </div>
        </div>
        <Image
          alt="close"
          id="closeMenu-1"
          className=""
          src="/img/fi-rr-cross.svg"
          style={{
            zIndex: 5,
            position: "absolute",
            top: 20,
            right: 20,
            width: 15,
            height: 15,
          }}
          onClick={(e) => handleCreateVisibility(false)}
          width={24}
          height={24}
        />
      </div>
    </section>
  );
}
