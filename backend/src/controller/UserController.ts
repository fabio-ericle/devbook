import { Request, Response } from 'express';
import { UserServices } from '../services/UserServices';

export class UserController {
   async create(request: Request, response: Response) {
      const userServices = new UserServices();
      const { user_name = '', user_email = '', user_password = ''} = request.body;
      const result = await userServices.create({ user_name, user_email, user_password });

      return response.status(201).send(result);
   }

   async list(request: Request, response: Response) {
      const userService = new UserServices();
      const result = await userService.get();

      return response.status(200).send(result);
   }

   async user(request: Request, response: Response) {
      const userServices = new UserServices();
      const user = await userServices.getUser(request.user);
      
      return response.json(user);
   }

   async userById(request: Request, response: Response) {
      const userServices = new UserServices();
      const { user_id = '' } = request.params;
      const user = await userServices.getById({ user_id });
      
      return response.json(user);
   }

   async update(request: Request, response: Response) {
      const { user_id, user_name, user_email } = request.body;
      const userServices = new UserServices();
      const result = await userServices.update({ user_id, user_name, user_email });

      return response.status(200).send(result);
   }

   async delete(request: Request, response: Response) {
      const userServices = new UserServices();
      const result = await userServices.delete(request.user);

      return response.status(200).send(result);
   }

   async auth(request: Request, response: Response) {
      const userServices = new UserServices();
      const { user_email = '', user_password = ''} = request.body;
      const result = await userServices.auth({ user_email, user_password });
      
      return response.status(200).send(result);
   }
}