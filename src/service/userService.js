const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Função asincrona de validação de usuario existente
//async function findUserByCpfOrCnpj(cpfOrCnpj) {
  //return await prisma.user.findUnique({
   // where: {
   //   cpfOrCnpj: cpfOrCnpj,
   // },
 // });
//}

// Função para criar um usuário
const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

module.exports = {
  //findUserByCpfOrCnpj,
  createUser,
};
