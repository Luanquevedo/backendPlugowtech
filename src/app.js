import express from "express";
import userRoutes from "./routes/userRoutes.js";
import  authenticateToken from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());

app.use("/", userRoutes);

app.get('/Profile', authenticateToken, (req, res) => {
    // Aqui, você pode acessar os dados do usuário autenticado
    res.json({ message: "Welcome to your profile", user: req.user });
  });


export { app };
