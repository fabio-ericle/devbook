import { Router } from 'express';
import { UserController } from '../controller/UserController';

const del = Router();

const userController = new UserController();

del.delete("/user", userController.delete);

export { del };