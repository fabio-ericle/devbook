import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
   async create(request: Request, response: Response) {
      const { user_name, user_email, user_password } = request.body;
      const userService = new UserService();
      const result = await userService.create({ data: { user_name, user_email, user_password } });
      return response.json(result);
   }

   async list(request: Request, response: Response) {
      const userService = new UserService();
      const result = await userService.get();
      return response.json(result);
   }

   async update(request: Request, response: Response) {
      const { user_id, user_name, user_email } = request.body;
      const userService = new UserService();
      const result = await userService.update({ data: { user_id, user_name, user_email } });
      return response.json(result);
   }

   async delete(request: Request, response: Response) {
      const { user_id } = request.body;
      const userService = new UserService();
      const result = await userService.delete(user_id);
      return response.json(result);
   }
}