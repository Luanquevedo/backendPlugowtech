import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Pega o token do cabeçalho Authorization

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  // Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user; // Salva as informações do usuário no request para as próximas etapas
    next(); // Passa para o próximo middleware ou rota
  });
};

export default authenticateToken;