import { Request, Response } from 'express';
import { PostServices } from '../services/PostServices';

export class PostController {
   async create(request: Request, response: Response) {
      const { post_title, post_content, user_id }  = request.body;
      const postServices = new PostServices();
      const result = await postServices.create({ data: { post_title, post_content, user_id } });
      return response.json(result);
   }

   async get(request: Request, response: Response) {
      const postServices = new PostServices();
      const result = await postServices.get();
      return response.json(result);
   }
}