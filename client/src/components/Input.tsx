import { type RegisterOptions, type UseFormRegister } from 'react-hook-form'

interface SimpleSelectProps {
  label: string
  name: string
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  required?: boolean
  type?: string
  error?: string
  hookForm?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>
    validations: RegisterOptions
  }
}

const Input = ({ label, name, handleChange, required, type, error, hookForm }: SimpleSelectProps) => {
  const HookForm = hookForm?.register(name, hookForm?.validations)
  return (
    <label id='label' className='form-label d-flex  flex-column smallText-regular'>
      {label}
      <input
        {...HookForm}
        id='input'
        className='form-control smallText-regular'
        type={type}
        name={name}
        required={required}
        onChange={handleChange}
      />
      {error && <p className='text-danger mb-0'>{error}</p>}
    </label>
  )
}

export default Input
