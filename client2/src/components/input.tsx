import { SimpleSelect } from "@/components";

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
}: SimpleSelectProps) {
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
        customClass={customClass}
          options={selectOptions}
          handleChange={handleChange}
          name={name}
        />
      )}
    </label>
  );
}
