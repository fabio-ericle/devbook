import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const update = Router();

const userController = new UserController();

update.put("/user", ensureAuthenticated, userController.update);

export { update };