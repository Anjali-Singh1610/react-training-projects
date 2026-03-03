import React from "react"

interface Props {
  label: string
  name: string
  type?: string
  value: string | number
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput: React.FC<Props> = ({
  label,
  name,
  type = "text",
  value,
  error,
  onChange
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <input
        className="form-control"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />

      {error && <div className="text-danger">{error}</div>}
    </div>
  )
}

export default FormInput