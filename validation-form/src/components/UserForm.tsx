import { useState } from "react"
import type { User } from "../types/User"
import FormInput from "./FormInput"

interface Props {
  onSubmit: (user: User) => void
  editingUser?: User | null
}

const UserForm: React.FC<Props> = ({ onSubmit, editingUser }) => {

  const [form, setForm] = useState<User>(
    editingUser || { id: 0, name: "", email: "", age: 0 }
  )

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    age: ""
  })

  const validate = () => {
    const newErrors = { name: "", email: "", age: "" }
    let valid = true

    if (!form.name) {
      newErrors.name = "Name required"
      valid = false
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Valid email required"
      valid = false
    }

    if (form.age <= 0) {
      newErrors.age = "Age must be > 0"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: name === "age" ? Number(value) : value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    onSubmit(form)

    setForm({
      id: 0,
      name: "",
      email: "",
      age: 0
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card p-3">

      <h4>User Form</h4>

      <FormInput
        label="Name"
        name="name"
        value={form.name}
        error={errors.name}
        onChange={handleChange}
      />

      <FormInput
        label="Email"
        name="email"
        value={form.email}
        error={errors.email}
        onChange={handleChange}
      />

      <FormInput
        label="Age"
        name="age"
        type="number"
        value={form.age}
        error={errors.age}
        onChange={handleChange}
      />

      <button className="btn btn-primary">
        {editingUser ? "Update User" : "Add User"}
      </button>

    </form>
  )
}

export default UserForm