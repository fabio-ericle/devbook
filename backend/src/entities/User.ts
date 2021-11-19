import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("users")
export class User {
   @PrimaryColumn()
   readonly user_id: string;

   @Column()
   user_name: string;

   @Column()
   user_email: string;

   constructor() {
      if(!this.user_id) {
         this.user_id = uuid();
      }
   }
}