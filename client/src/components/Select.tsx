import Select, { type ActionMeta, type SingleValue } from 'react-select'

interface SimpleSelectProps {
  options: any
  handleChange?: (newValue: SingleValue<string>, actionMeta: ActionMeta<string>) => void
  name: string
  customClass?: string
  value?: string
  error?: string
  label: string
}

const SimpleSelect = ({ options, handleChange, name, customClass, value, error, label }: SimpleSelectProps) => {
  const active = value
    ? ({
        value,
        label: value?.length ? value : 'Selecciona una opción'
      } as any)
    : undefined
  return (
    <label id='label' className='form-label d-flex  flex-column smallText-regular'>
      {label}
      <Select
        name={name}
        options={options}
        value={active}
        defaultValue={options[0]}
        onChange={handleChange}
        className={`basic-multi-select smallText-regular ${customClass}`}
        classNamePrefix='select'
      />
      {error && <p className='text-danger mb-0'>{error}</p>}
    </label>
  )
}

export default SimpleSelect
