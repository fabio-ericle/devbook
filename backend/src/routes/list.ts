import { Router } from 'express';
import { UserController } from '../controller/UserController';

const list = Router();

const userController = new UserController();

list.get("/users", userController.list);

export { list };