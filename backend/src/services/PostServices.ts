import { getCustomRepository } from 'typeorm';
import { PostRepository } from '../repositories/PostRepository';
import { UserRepository } from '../repositories/UserRepository';
import { classToPlain } from 'class-transformer';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { AppError } from '../shared/error/AppError';

type PostProps = {
   data: {
      post_title: string;
      post_content: string;
      user_id: string;
   }
}

export class PostServices {
   async create(post: Partial<Post>, user: Partial<User>) {
      const postRepository = getCustomRepository(PostRepository);
      const userRepository = getCustomRepository(UserRepository);

      if (post.post_title.length < 5 || post.post_content.length < 5 || post.user_id.length < 5) {
         throw new AppError("Não foi possível concluir a ação!", 401);
      }

      const userExists = await userRepository.findOne(
         { where: { user_id : user.user_id } }
      );
      if (!user) {
         throw new AppError("Não foi possível concluir a ação!", 401);
      }

      const dateNow = Date.now();
      const date = new Date(dateNow);

      const createPost = postRepository.create({
         post_title: post.post_title,
         post_content: post.post_content,
         user_id: post.user_id,
         created_at: date,
      });

      await postRepository.save(createPost);
      
      return { "status": "concluido!" };
   }

   async get() {
      const postRepository = getCustomRepository(PostRepository);
      
      const posts = await postRepository.find();

      return classToPlain(posts);
   }

   async getById(id: string) {
      if (id.length < 10 || id === '' || typeof id !== 'string') {
         throw new AppError("Impossível concluir a ação!", 401);
      }

      const postRepository = getCustomRepository(PostRepository);
      
      const currentPost = await postRepository.findOne({ 
         where: { post_id : id }
       });
      if (!currentPost) {
         throw new AppError("Publicação não encontrada!", 401);
      }

      return classToPlain(currentPost);
   }

   async delete(id: string, user: Pick<User, "user_id">) {
      if (id.length < 10 || id === '' || typeof id !== 'string') {
         throw new AppError("Impossível concluir a ação!", 401);
      }

      const postRepository = getCustomRepository(PostRepository);
      const userRepository = getCustomRepository(UserRepository);

      const currentUser = await userRepository.findOne({
         where: { user_id : user.user_id }
      });
      if(!currentUser) {
         throw new AppError("Não foi possível excluir esse post", 401);
      }

      const currentPost = await postRepository.findOne({
         where: { post_id : id }
      });
      if (!currentPost) {
         throw new AppError("Publicação não encontrada!", 401);
      }

      if(currentPost.user_id !== user.user_id) {
         throw new AppError("Operação não permitida", 401);
      }

      await postRepository.delete({
         "post_id" : id
      });
      
      return {"status" : "concluído"};
   }
}