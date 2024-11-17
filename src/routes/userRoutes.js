import { Router } from "express";
import userController from "../controller/userController.js";


const router = Router();

router.post("/Users", userController.createUser);

router.put('/Users/:id', userController.updateUser);//Rota de atualização de dados cadastrais. Necessario passar o ID atraves da api para validar a alteração

router.put("/Users/:id/accessLevel", userController.updateAccess) //Rota de atualização de status e nivel de acesso. Necessario passar o ID atraves da api para validar a alteração

router.post("/Login", userController.loginUser);

export default router;