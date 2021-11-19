import { getCustomRepository, getConnection } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { classToPlain } from 'class-transformer';
import { User } from '../entities/User';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface UserProps {
   data: {
      user_id?: string;
      user_name?: string;
      user_email?: string;
      user_password?: string;
   },
}

export class UserService {

   async create({ data }: UserProps,) {
      const userRepository = getCustomRepository(UserRepository);
      if(data.user_name!.length < 5 || data.user_email!.length < 5 || data.user_password!.length < 5) {
         throw new Error("Não foi possível concluir o cadastro!");
      }
      const userAlreadyExists = await userRepository.findOne({"user_email" : data.user_email});
      if(userAlreadyExists) {
         throw new Error("Email já cadastrado!");
      }
      const passwordHash = await hash(data.user_password!, 8);
      const user = userRepository.create({
         user_name: data.user_name,
         user_email: data.user_email,
         user_password: passwordHash
      });
      await userRepository.save(user);
      const email = data.user_email;
      const password = data.user_password;
      const token = sign({ email, password }, process.env.SESSION_TOKEN as string, {
         subject: user.user_id,
         expiresIn: "1d"
      })
      return {
         "status" : "salvo",
         "user": {
            "token": token,
            "user_id": user.user_id,
            "user_name": data.user_name,
            "user_email": data.user_email            
         }
      };
   }

   async get() {
      const userRepository = getCustomRepository(UserRepository);
      const users = await userRepository.find({
         select: [
            "user_id",
            "user_name",
            "user_email"
         ]
      });
      return classToPlain(users);
   }
   
   async update({ data }: UserProps) {
      const userRepository = getCustomRepository(UserRepository);
      if(data.user_id!.length < 10) {
         throw new Error("Não foi possível concluir o cadastro!");
      }
      const userAlreadyExists = await userRepository.findOne(data.user_id);
      if(!userAlreadyExists) {
         throw new Error("Usuário não encontrado!");
      }
      getConnection().createQueryBuilder().update(User).set({
         user_name: data.user_name,
         user_email: data.user_email,
      }).where(
         "user_id = :user_id",
         { user_id: data.user_id! }
      ).execute();
      return {"status" : "salvo"};
   }

   async delete(user_id: string) {
      const userRepository = getCustomRepository(UserRepository);
      const userAlreadyExists = await userRepository.findOne(user_id!);
      if(!userAlreadyExists) {
         throw new Error("Usuário não encontrado!");
      }
      await userRepository.delete({
         user_id : user_id!,
      });
      return {"status" : "salvo"};
   }
}