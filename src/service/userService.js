const prisma = require("../config/prismaClient");

const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

module.exports = { findUserByUsername, createUser };
