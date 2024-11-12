import { user } from "../config/prismaClient.js";

export const findUserByUsername = async (username) => {
  return await user.findUnique({
    where: { username },
  });
};

export const createUser = async (data) => {
  return await user.create({
    data,
  });
};

