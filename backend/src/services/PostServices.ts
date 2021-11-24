import { getCustomRepository } from 'typeorm';
import { PostRepository } from '../repositories/PostRepository';
import { UserRepository } from '../repositories/UserRepository';
import { classToPlain } from 'class-transformer';

type PostProps = {
   data: {
      post_title: string;
      post_content: string;
      user_id: string;
   }
}

export class PostServices {
   async create({ data }: PostProps) {
      const postRepository = getCustomRepository(PostRepository);
      const userRepository = getCustomRepository(UserRepository);
      if (data.post_title.length < 5 || data.post_content.length < 5 || data.user_id.length < 5) {
         throw new Error("Não foi possível concluir a ação!");
      }
      const user = await userRepository.findOne({ "user_id": data.user_id });
      if (!user) {
         throw new Error("Não foi possível concluir a ação!");
      }
      const dateNow = Date.now();
      const date = new Date(dateNow);
      const post = postRepository.create({
         post_title: data.post_title,
         post_content: data.post_content,
         user_id: data.user_id,
         created_at: date,
      });
      await postRepository.save(post);
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
      const post = await postRepository.findOne({ "post_id": id });
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
      const post = await postRepository.findOne({ "post_id": id });
      if (!post) {
         throw new Error("Publicação não encontrada!");
      }
      await postRepository.delete({
         "post_id" : id
      });
      return {"status" : "concluído"};
   }
}