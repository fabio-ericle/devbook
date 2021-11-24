import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { PostController } from '../controller/PostController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const list = Router();

const userController = new UserController();
const postController = new PostController();

list.get("/users", ensureAuthenticated, userController.list);
list.get("/user", ensureAuthenticated, userController.user);
list.get("/posts", ensureAuthenticated, postController.get);
list.get("/post", ensureAuthenticated, postController.getById);

export { list };