import { getCustomRepository } from 'typeorm';
import { PostRepository } from '../repositories/PostRepository';
import { UserRepository } from '../repositories/UserRepository';
import { classToPlain } from 'class-transformer';
import { Post } from '../entities/Post';
import { User } from '../entities/User';

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
         throw new Error("Não foi possível concluir a ação!");
      }

      const userExists = await userRepository.findOne(
         { where: { user_id : user.user_id } }
      );
      if (!user) {
         throw new Error("Não foi possível concluir a ação!");
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
      if (id.length < 10 || id === '') {
         throw new Error("Impossível concluir a ação!");
      }

      const postRepository = getCustomRepository(PostRepository);
      
      const post = await postRepository.findOne({ 
         where: { post_id : id }
       });
      if (!post) {
         throw new Error("Publicação não encontrada!");
      }

      return classToPlain(post);
   }

   async delete(id: string) {
      if (id.length < 10 || id === '') {
         throw new Error("Impossível concluir a ação!");
      }

      const postRepository = getCustomRepository(PostRepository);

      const post = await postRepository.findOne({
         where: { post_id : id }
      });
      if (!post) {
         throw new Error("Publicação não encontrada!");
      }

      await postRepository.delete({
         "post_id" : id
      });
      
      return {"status" : "concluído"};
   }
}