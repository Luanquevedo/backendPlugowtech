import { user } from "../config/prismaClient.js";

export const findUserByUsernameOrEmail = async (usernameOrEmail) => {
  if (!usernameOrEmail) {
    throw new Error("Username or email is required");
  }

  try {
    const foundUser = await user.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      }
    });

    return foundUser;
  } catch (error) {
    console.error("Error finding user:", error);
    throw new Error("Error finding user");
  }
};


export const findUserByUsername = async (username) => {
  return await user.findUnique({
    where: {
      username,
    },
  });
};

export const createUser = async (data) => {
  return await user.create({
    data,
  });
};
