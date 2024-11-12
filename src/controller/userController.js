const userSchema = require("../schema/userSchema");
const userService = require("../service/userService");

async function registerUser(req, res) {
  try {
    const validatedData = userSchema.parse(req.body);
    const user = await userService.createUser(validatedData);
    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
};