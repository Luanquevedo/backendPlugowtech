import { hash, compare } from "bcrypt";
import { safeParse as _safeParse, safeParseLogin as _safeParseLogin } from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import { findUserByUsernameOrEmail as _findUserByUsernameOrEmail, findUserByUsername as _findUserByUsername, createUser as _createUser } from "../service/userService.js";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  console.log('Request Body:', req.body);
  const result = _safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }

  try {
    const existingUser = await _findUserByUsername(result.data.username);

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await hash(result.data.password, saltRounds);

    const user = await _createUser({
      username: result.data.username,
      password: hashedPassword,
      accessLevel: result.data.accessLevel,
      status: result.data.status || "active", // Caso não tenha sido fornecido, será "active" por padrão
      cpfCnpj: result.data.cpfCnpj,
      email: result.data.email,
      companyStore: result.data.companyStore,
      professionalDocument: result.data.professionalDocument,
      dateOfBirth: result.data.dateOfBirth,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { success, data, error } = _safeParseLogin(req.body); // Valida o corpo da requisição (username e password)

  if (!success) {
    return res.status(400).json(error.errors);
  }

  const { usernameOrEmail, password } = data;

  // Verifique se o campo usernameOrEmail foi fornecido
  if (!usernameOrEmail) {
    return res.status(400).json({ error: "Username or email is required" });
  }

  try {
    // Verifica se o usuário existe no banco de dados
    const user = await _findUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Gera um token JWT com os dados do usuário
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h", // O token expira em 1 hora
    });

    // Retorna o token para o cliente
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


//Atualiza dados do usuario com base no id fornecido
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    cpfCnpj,
    professionalDocument,
    email,
    companyStore,
    dateOfBirth
  } = req.body;

  console.log('Dados recebidos:', req.body);

  try {
    if (!id) {
      return res.status(400).json({ error: 'ID do usuário não fornecido' });
    }

    // Verifica se a data de nascimento está no formato correto
    if (dateOfBirth && isNaN(new Date(dateOfBirth).getTime())) {
      return res.status(400).json({ error: 'Data de nascimento inválida' });
    }

    let updateData = {
      username,
      cpfCnpj,
      professionalDocument,
      email,
      companyStore,
      dateOfBirth: new Date(dateOfBirth),
    };

    // Se a senha for fornecida, re-hasheia e a adiciona aos dados de atualização
    if (password) {
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
      const hashedPassword = await hash(password, saltRounds);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error); o
    return res.status(500).json({
      error: 'Erro ao atualizar o usuário',
      message: error.message,
      stack: error.stack, // Adiciona o stack trace do erro para depuração
    });
  }
};

// Atualiza o Status e Nivel de acesso atraves do id fornecido
const updateAccess = async (req, res) => {
  const { id } = req.params;
  const { accessLevel, status } = req.body;

  console.log('Dados recebidos:', req.body);

  try {
    // Verifique se o ID foi fornecido
    if (!id) {
      return res.status(400).json({ error: 'ID do usuário não fornecido' });
    }

    // Verifique se os campos accessLevel e status foram fornecidos
    if (!accessLevel || !status) {
      return res.status(400).json({
        error: 'Os campos accessLevel e status são obrigatórios',
      });
    }

    let updateData = {
      accessLevel,
      status,
    };

    // Atualize os dados do usuário usando o Prisma
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    // Retorne a resposta com os dados do usuário atualizado
    return res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    return res.status(500).json({
      error: 'Erro ao atualizar o usuário',
      message: error.message,
      stack: error.stack, // Adiciona o stack trace do erro para depuração
    });
  }
};

export default { createUser, loginUser, updateUser, updateAccess };
