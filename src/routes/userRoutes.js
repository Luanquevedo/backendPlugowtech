import { Router } from "express";
import userController from "../controller/userController.js";

const router = Router();

router.post("/Users", userController.createUser);

router.post("/Login", userController.loginUser);

export default router;
