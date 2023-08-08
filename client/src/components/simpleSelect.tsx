import Select from "react-select";

type SimpleSelectProps = {
  options: any;
  handleChange: any;
  name: string;
  customClass?: string;
  value?: any;
};
export default function SimpleSelect({
  options,
  handleChange,
  name,
  customClass,
  value,
}: SimpleSelectProps) {
  return (
    <Select
      name={name}
      value={value}
      options={options}
      onChange={handleChange}
      className={`basic-multi-select smallText-regular ${customClass}`}
      classNamePrefix="select"
    />
  );
}
