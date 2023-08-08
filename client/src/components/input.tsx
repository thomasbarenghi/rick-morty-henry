import { SimpleSelect } from "@/components";
import { useEffect } from "react";
import {DEFAULT} from "@/constants";
type SimpleSelectProps = {
  renderType: "input" | "select";
  selectOptions?: any;
  label: string;
  name: string;
  handleChange: any;
  value?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  options?: any;
  customClass?: string;
  error: string;
  selectValue?: any;
};

export default function Input({
  renderType,
  selectOptions,
  customClass,
  label,
  name,
  handleChange,
  value,
  required,
  type,
  placeholder,
  options,
  error,
  selectValue,
}: SimpleSelectProps) {

  //agregamos default al selectOptions

  if (selectOptions && selectOptions.some((o: any) => o.value == DEFAULT) === true) {
    console.log("hay def");
    //selectOptions.unshift({ value: "Default", label: "Default" });
  } else {
    console.log("no hay def");
  //  selectOptions = [{ value: "Default", label: "Default" }];
  selectOptions.unshift({ value: DEFAULT, label: DEFAULT });
  }

  return (
    <label
      id="label"
      className="form-label d-flex  flex-column smallText-regular"
    >
      {label}
      {renderType === "input" ? (
        <input
          id="input"
          className="form-control smallText-regular"
          type={type}
          name={name}
          required={required}
          onChange={handleChange}
        />
      ) : (
        <SimpleSelect
        value = {selectValue}
          customClass={customClass}
          options={selectOptions}
          handleChange={handleChange}
          name={name}
        />
      )}
      {error && (
        <p className="text-danger mb-0">
          {error}
        </p>
      )}
    </label>
  );
}
