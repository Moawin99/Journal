const prisma = require('../config/prismaConfig');

const getEntriesByUserId = async (id) => {
	// const page = Number(req.query.page) || 0;
	const page = 0;

	const entries = await prisma.entries.findMany({
		where: {
			user_id: id
		},
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			id: true,
			title: true,
			mood: true,
			entry: true,
			createdAt: true
		},
		skip: page * 20,
		take: 20
	});
	return entries;
};

const createEntry = async (req) => {
	const { title, mood, entry, userId } = req.body;
	const newEntry = await prisma.entries.create({
		data: {
			title,
			mood,
			entry,
			user_id: userId
		}
	});
	return newEntry;
};

const updateEntry = async (req) => {
	const { id, title, mood, entry } = req.body;
	const updatedEntry = await prisma.entries.update({
		where: {
			id
		},
		data: {
			title,
			mood,
			entry
		}
	});
	return updatedEntry;
};

const deleteEntry = async (id) => {
	const deletedEntry = await prisma.entries.delete({
		where: {
			id
		}
	});
	return deletedEntry;
};

module.exports = {
	getEntriesByUserId,
	createEntry,
	updateEntry,
	deleteEntry
};
