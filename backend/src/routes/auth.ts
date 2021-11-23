import { Router } from "express";
import { UserController } from '../controller/UserController';

const authentication = Router();

const userController = new UserController();

authentication.post("/login", userController.auth);

export { authentication };