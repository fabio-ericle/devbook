import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
   async create(request: Request, response: Response) {
      const { user_name, user_email } = request.body;
      const userService = new UserService();
      const result = await userService.execute({ data: { user_name, user_email } });
      response.json(result);
   }

   async list(request: Request, response: Response) {
      const userService = new UserService();
      const result = await userService.list();
      response.json(result);
   }
}