import { Entity, Column, PrimaryColumn, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity("posts")
export class Post {
   @PrimaryColumn()
   readonly post_id: string;

   @Column()
   post_title: string;

   @Column()
   post_content: string;

   @Column()
   user_id: string;

   @JoinColumn({ name: "user_id" })
   @OneToMany(() => User, user => user.user_id)
   userId: User[];

   @CreateDateColumn()
   created_at: Date;

   constructor() {
      if(!this.post_id) {
         this.post_id = uuid();
      }
   }
}