import { Request, Response } from 'express';
import { PostServices } from '../services/PostServices';

export class PostController {
   async create(request: Request, response: Response) {
      const { post_title, post_content }  = request.body;
      const postServices = new PostServices();
      const result = await postServices.create({ post_title, post_content }, request.user );
      
      return response.json(result);
   }

   async get(request: Request, response: Response) {
      const postServices = new PostServices();
      const result = await postServices.get();
      
      return response.json(result);
   }

   async getById(request: Request, response: Response) {
      const { id = ''} = request.params;
      const postServices = new PostServices();
      const post = await postServices.getById(id as string);
      
      return response.json(post);
   }

   async delete(request: Request, response: Response) {
      const { id = ''} = request.query;
      const postServices = new PostServices();
      const result = await postServices.delete(id as string, request.user);
      
      return response.json(result);
   }
}