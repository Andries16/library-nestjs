import { BeforeInsert, Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/auth/roles/role.enum';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn() _id: ObjectId;
  @Column() name: string;
  @Column() @IsEmail() email: string;
  @Column() password: string;
  @Column() role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
