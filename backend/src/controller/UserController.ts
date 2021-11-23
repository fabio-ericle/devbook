import { Request, Response } from 'express';
import { UserServices } from '../services/UserServices';

export class UserController {
   async create(request: Request, response: Response) {
      const { user_name, user_email, user_password } = request.body;
      const userServices = new UserServices();
      const result = await userServices.create({ data: { user_name, user_email, user_password } });
      return response.json(result);
   }

   async list(request: Request, response: Response) {
      const userService = new UserServices();
      const result = await userService.get();
      return response.json(result);
   }

   async user(request: Request, response: Response) {
      const { id } = request.query;
      const userServices = new UserServices();
      const user = await userServices.getId(id as string);
      return response.json(user);
   }

   async update(request: Request, response: Response) {
      const { user_id, user_name, user_email } = request.body;
      const userServices = new UserServices();
      const result = await userServices.update({ data: { user_id, user_name, user_email } });
      return response.json(result);
   }

   async delete(request: Request, response: Response) {
      const { user_id } = request.body;
      const userServices = new UserServices();
      const result = await userServices.delete(user_id);
      return response.json(result);
   }

   async auth(request: Request, response: Response) {
      const { user_email, user_password } = request.body;
      const userServices = new UserServices();
      const result = await userServices.auth({ data: { user_email, user_password } });
      return response.json(result);
   }
}