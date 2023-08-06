import Select from "react-select";

type SimpleSelectProps = {
  options: any;
  handleChange: any;
  name: string;
  customClass?: string;
};
export default function SimpleSelect({
  options,
  handleChange,
  name,
  customClass,
}: SimpleSelectProps) {
  return (
    <Select
      name={name}
      options={options}
      onChange={handleChange}
      className={`basic-multi-select smallText-regular ${customClass}`}
      classNamePrefix="select"
    />
  );
}
