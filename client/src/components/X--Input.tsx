interface SimpleSelectProps {
  label: string
  name: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  required?: boolean
  type?: string
  error: string
}

const Input = ({ label, name, handleChange, required, type, error }: SimpleSelectProps) => (
  <label id='label' className='form-label d-flex  flex-column smallText-regular'>
    {label}
    <input
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

export default Input
