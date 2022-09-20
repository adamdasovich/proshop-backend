import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Normal User',
		email: 'adam@gmail.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		name: 'Bob Hope',
		email: 'bob@gmail.com',
		password: bcrypt.hashSync('123456', 10)
	}
]

export default users;