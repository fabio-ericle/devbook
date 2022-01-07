import { getCustomRepository, getConnection, getRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { classToPlain } from 'class-transformer';
import { User } from '../entities/User';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../shared/error/AppError';

interface UserProps {
   data: {
      user_id: string;
      user_name: string;
      user_email: string;
      user_password: string;
   },
}

export class UserServices {

   async create(user: Partial<User>) {
      const userRepository = getCustomRepository(UserRepository);

      if (user.user_name!.length < 5 || user.user_email!.length < 5 || user.user_password!.length < 5) {
         throw new AppError("Não foi possível concluir o cadastro!", 401);
      }
      const userAlreadyExists = await userRepository.findOne({ 
         where: { user_email : user.user_email } 
      });
      if (userAlreadyExists) {
         throw new AppError("Email já cadastrado!", 401);
      }

      const passwordHash = await hash(user.user_password, 8);

      const createUser = userRepository.create({
         user_name: user.user_name,
         user_email: user.user_email,
         user_password: passwordHash
      });

      await userRepository.save(createUser);

      const token = sign({ 
         user_name: user.user_name,
         user_email: user.user_email,
       }, 
         process.env.SESSION_TOKEN as string, 
         {
            subject: createUser.user_id,
            expiresIn: "14d"
      });
      return { token : token };
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

   async getUser(user: Pick<User, "user_id">) {
      const userRepository = getRepository(User);

      const currentUser = await userRepository.findOne({ where: { user_id : user.user_id }});
      if (!user.user_id) {
         throw new AppError("Usuário não encontrado!", 401);
      }
      delete currentUser.user_password;

      return currentUser;
   }

   async getById(user: Pick<User, "user_id">) {
      const userRepository = getRepository(User);

      const currentUser = await userRepository.findOne({ where: { user_id : user.user_id }});
      if (!user.user_id) {
         throw new AppError("Usuário não encontrado!", 401);
      }
      delete currentUser.user_password;

      return currentUser;
   }

   async update(user: Partial<User>) {
      const userRepository = getCustomRepository(UserRepository);

      if (user.user_id.length < 10) {
         throw new AppError("Não foi possível concluir o cadastro!", 401);
      }

      const userAlreadyExists = await userRepository.findOne(user.user_id);
      if (!userAlreadyExists) {
         throw new AppError("Usuário não encontrado!", 401);
      }

      getConnection().createQueryBuilder().update(User).set({
         user_name: user.user_name,
         user_email: user.user_email,
      }).where(
         "user_id = :user_id",
         { user_id: user.user_id! }
      ).execute();

      return { "status": "salvo" };
   }

   async delete(user: Pick<User, "user_id">) {
      const userRepository = getCustomRepository(UserRepository);

      const userAlreadyExists = await userRepository.findOne({
         where: { user_id : user.user_id }
      });
      if (!userAlreadyExists) {
         throw new AppError("Usuário não encontrado!", 401);
      }

      await userRepository.delete({
         user_id: user.user_id,
      });
      
      return { "status": "salvo" };
   }

   async auth(user: Pick<User, "user_email"|"user_password">) {
      const userRepository = getCustomRepository(UserRepository);

      if (user.user_email.length < 5 || user.user_password.length < 5) {
         throw new AppError("Não foi possível concluir a ação!", 401);
      }

      const currentUser = await userRepository.findOne({ "user_email": user.user_email });
      if (!user) {
         throw new AppError("Email/Senha incorretos!", 40);
      }

      const passwordMatch = await compare(user.user_password, user.user_password);
      if (!passwordMatch) {
         throw new AppError("Email/Senha incorretos!", 401);
      }

      const token = sign({ 
         user_name: currentUser.user_name,
         user_email: currentUser.user_email,
       }, 
         process.env.SESSION_TOKEN as string, 
         {
            subject: currentUser.user_id,
            expiresIn: "14d"
      });
      
      return { token : token };
   }
}
