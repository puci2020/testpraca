import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Damian Jabłoński',
        email: 'damian@example.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'Bartosz Jabłoński',
        email: 'bartosz@example.com',
        password: bcrypt.hashSync('123456', 10),
        
    }
]
export default users