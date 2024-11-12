const bcrypt = require("bcrypt");
const userSchema = require("../schemas/userSchema");
const userService = require("../services/userService");

const createUser = async (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }

  try {
    const existingUser = await userService.findUserByUsername(result.data.username);

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(result.data.password, saltRounds);

    const user = await userService.createUser({
      username: result.data.username,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser };
