import { Router } from "express";
import userController from "../controller/userController.js";


const router = Router();

router.post("/Users", userController.createUser);

router.put('/Users/:id', userController.updateUser);// Necessario passar o ID atraver da api(atualização futura fazer conversar com JWT)

router.put("/Users/:id/accessLevel", userController.updateAccess)

router.post("/Login", userController.loginUser);

export default router;