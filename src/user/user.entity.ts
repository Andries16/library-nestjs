import { BeforeInsert, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BookEntity } from 'src/book/book.entity';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn() id: ObjectId;
  @Column() name: string;
  @Column() @IsEmail() email: string;
  @Column() password: string;
  @Column() role: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
