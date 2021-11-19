import { Router } from 'express';
import { UserController } from '../controller/UserController';

const update = Router();

const userController = new UserController();

update.put("/user", userController.update);

export { update };