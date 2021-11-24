import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { PostController } from '../controller/PostController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const del = Router();

const userController = new UserController();
const postController = new PostController();

del.delete("/user", ensureAuthenticated,  userController.delete);
del.delete("/post", ensureAuthenticated, postController.delete);

export { del };