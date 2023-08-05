import { IsEmail } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { BookEntity } from 'src/book/book.entity';
import { UserEntity } from 'src/user/user.entity';

@Entity('users')
export class WriterEntity extends UserEntity {
  @ObjectIdColumn() id: ObjectId;
  @Column() name: string;
  @Column() @IsEmail() email: string;
  @Column() password: string;
  @Column() role: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany((type) => BookEntity, (book) => book.writer)
  books: BookEntity[];
}
