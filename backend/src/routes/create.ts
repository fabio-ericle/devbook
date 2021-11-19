import { Router } from 'express';
import { UserController } from '../controller/UserController';

const create = Router();

const userController = new UserController();

create.post("/user", userController.create);

export { create };