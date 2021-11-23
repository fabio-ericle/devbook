import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { PostController } from '../controller/PostController';

const list = Router();

const userController = new UserController();
const postController = new PostController();

list.get("/users", userController.list);
list.get("/user", userController.user);
list.get("/posts", postController.get);

export { list };