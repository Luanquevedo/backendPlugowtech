const userSchema = require("../schema/userSchema");
const userService = require("../service/userService");
const bcrypt = require('bcrypt')

async function registerUser(req, res) {
  try {
    //Validação de dados no Zod
    const validatedData = userSchema.parse(req.body);

    //validação se ususario já existe no banco
    const existingUser = await userService.findUserByCpfOrCnpj(validatedData.cpfOrCnpj);
    if (existingUser){
      return res.status(400).json({ error: "Usuário já existe com esse CPF ou CNPJ"});
    }

    // Criptografia de senhas em hash
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    validatedData.password = hashedPassword;

    //Criação de usuário
    const user = await userService.createUser(validatedData);
    res.status(201).json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
};