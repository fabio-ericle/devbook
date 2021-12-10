import { Router } from 'express';
import { create } from './create';
import { list } from './list';
import { update } from './update';
import { del } from './delete';
import { authentication } from './auth';

const routes = Router();

routes.use(create);
routes.use(list);
routes.use(update);
routes.use(del);
routes.use(authentication);

export default routes;