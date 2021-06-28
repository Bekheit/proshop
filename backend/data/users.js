import bcrypt from 'bcryptjs'

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync('123', 10),
    isAdmin: true
  },
  {
    name: "Ahmed",
    email: "ahmed@example.com",
    password: bcrypt.hashSync('123', 10),
  },
  {
    name: "Mohamed",
    email: "mohamed@example.com",
    password: bcrypt.hashSync('123', 10),
  },
]

export default users