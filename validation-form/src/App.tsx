import { useState } from "react"
import type { User } from "./types/User"
import UserForm from "./components/UserForm"
import UserTable from "./components/UserTable"

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const handleSubmit = (user: User) => {

    if (editingUser) {

      setUsers(users.map(u =>
        u.id === editingUser.id ? { ...user, id: editingUser.id } : u
      ))

      setEditingUser(null)

    } else {

      user.id = Date.now()

      setUsers([...users, user])
    }
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  return (
    <div className="container mt-4">

      <UserForm
        onSubmit={handleSubmit}
        editingUser={editingUser}
      />

      <UserTable
        users={users}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

    </div>
  )
}

export default App