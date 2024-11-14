import { hash, compare } from "bcrypt";
import { safeParse as _safeParse, safeParseLogin as _safeParseLogin } from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import { findUserByUsernameOrEmail as _findUserByUsernameOrEmail, findUserByUsername as _findUserByUsername, createUser as _createUser } from "../service/userService.js";

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

//Api de atualização de dados cadastrais base sem alterar niveis de acesso ou de status
const updateData = async (req, res) => {
  const { id } = req.params;

  //Verificação se o usuario esta tentando atualizar os proprios dados
  if (req.user.userId !== parseInt(id)){
    return res.status(403).json({error: "Acesso negado"})
  }
  const {
    username,
    password,
    cpfCnpj,
    email,
    companyStore,
    professionalDocument,
    dateOfBirth,
  } = req.body;

  try {
    const dataToUpdate = {
      username,
      cpfCnpj,
      email,
      companyStore,
      professionalDocument,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
    };

    //atualização de senha e criptografada em hash para salvar no banco de dados
      if (password) {
        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        dataToUpdate.password = await hash (password, saltRounds);
      }

      //remove campos vazios para que atualize apenas os dados desejados
      Object.keys(dataToUpdate).forEach(key => dataToUpdate[key] === undefined && delete dataToUpdate[key]);


      const updateUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: dataToUpdate,
      });

    res.json(updateUser);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não localizado" });
    }
    res.status(500).json({ error: "Não foi possivel atualizar o usuário" });
  }
}

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


export default { createUser, loginUser, updateData };
