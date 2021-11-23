import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { PostController } from '../controller/PostController';
import { ensureAuthenticated  } from '../middlewares/ensureAuthenticated';

const create = Router();

const userController = new UserController();
const postController = new PostController();

create.post("/user", userController.create);
create.post("/post", ensureAuthenticated, postController.create);

export { create };