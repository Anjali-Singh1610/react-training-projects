import type { User } from "../types/User"

interface Props {
  users: User[]
  onDelete: (id: number) => void
  onEdit: (user: User) => void
}

const UserTable: React.FC<Props> = ({ users, onDelete, onEdit }) => {

  return (
    <div className="card p-3 mt-4">

      <h4>User List</h4>

      <table className="table table-striped">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map(user => (

            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default UserTable