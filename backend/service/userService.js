const prisma = require('../config/prismaConfig');

const createUser = async (req, res) => {
	const { username, password, first_name, last_name } = req.body;
	if (username === null || password === null || first_name === null || last_name === null) {
		return res.status(500).send({ error: 'Not all arguments present' });
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const newUser = await prisma.users.create({
			data: {
				first_name,
				last_name,
				username,
				password: hashedPassword
			}
		});
		return newUser;
	} catch (err) {
		return res.status(500).send('Error creating user');
	}
};

const updateUser = async (req, res) => {
	const id = req.body.id;
	const { username, password, first_name, last_name } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const updatedUser = await prisma.users.update({
			where: { id },
			data: {
				first_name,
				last_name,
				username,
				password: hashedPassword
			}
		});
		return updatedUser;
	} catch (err) {
		return res.status(500).send('Error updating user');
	}
};

const deleteUser = async (req, res) => {
	const id = req.body.id;
	try {
		const deletedUser = await prisma.users.delete({
			where: { id }
		});
		return deletedUser;
	} catch (err) {
		return res.status(500).send('Error deleting user');
	}
};

const getUser = async (id) => {
	try {
		const user = await prisma.users.findUnique({
			where: { id: id }
		});
		return { user };
	} catch (err) {
		return { error: 'Error getting user' };
	}
};

module.exports = {
	createUser,
	updateUser,
	deleteUser,
	getUser
};
