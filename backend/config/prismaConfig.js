const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// prisma.$connect();

prisma.$on('beforeExit', async () => {
	console.log('\nClosing Prisma Client');
});

module.exports = prisma;
