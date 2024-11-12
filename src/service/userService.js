const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para criar um usuário
const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

module.exports = {
  createUser,
};
