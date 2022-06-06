const prisma = require("../config/prismaConfig");

const getEntriesByUserId = async (id) => {
  const page = 0;

  const entries = await prisma.entries.findMany({
    where: {
      user_id: id,
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      title: true,
      mood: true,
      entry: true,
      created_at: true,
    },
    skip: page * 20,
    take: 20,
  });
  return entries;
};

const createEntry = async (req, id) => {
  const { title, mood, entry } = req.body;
  const newEntry = await prisma.entries.create({
    data: {
      title,
      mood,
      entry,
      user_id: id,
    },
  });
  return newEntry;
};

const updateEntry = async (req) => {
  const { id, title, mood, entry } = req.body;
  const updatedEntry = await prisma.entries.update({
    where: {
      id,
    },
    data: {
      title,
      mood,
      entry,
    },
  });
  return updatedEntry;
};

const deleteEntry = async (id) => {
  const deletedEntry = await prisma.entries.delete({
    where: {
      id,
    },
  });
  return deletedEntry;
};

module.exports = {
  getEntriesByUserId,
  createEntry,
  updateEntry,
  deleteEntry,
};
