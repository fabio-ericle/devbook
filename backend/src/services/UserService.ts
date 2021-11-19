import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { classToPlain } from 'class-transformer';

type UserProps = {
   data: {
      user_name: string;
      user_email: string;
   }
}

export class UserService {

   async execute({ data }: UserProps) {
      const userRepository = getCustomRepository(UserRepository);
      const userAlreadyExists = userRepository.findOne(data.user_email);
      if(userAlreadyExists) {
         throw new Error("Email já cadastrado!");
      }
      const user = userRepository.create({
         user_name: data.user_name,
         user_email: data.user_email,
      });
      await userRepository.save(user);

      return {"status" : "salvo"};
   }

   async list() {
      const userRepository = getCustomRepository(UserRepository);
      const users = await userRepository.find();
      return classToPlain(users);
   }
}