import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.UserRepository.find();
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password } = dto;

    const user = await this.UserRepository.findOneBy({ email: email });
    if (user)
      throw new HttpException(
        {
          message: 'Input data validation failed',
          error: 'Email must be unique',
        },
        HttpStatus.BAD_REQUEST,
      );

    const NewUser = new UserEntity();
    NewUser.name = name;
    NewUser.email = email;
    NewUser.password = password;
    NewUser.role = 2;

    const errors = await validate(NewUser);

    if (errors.length > 0)
      throw new HttpException(
        { message: 'Failed validating data', errors },
        HttpStatus.BAD_REQUEST,
      );

    return this.UserRepository.save(NewUser);
  }

  async getById(id: ObjectId): Promise<UserEntity> {
    const user = await this.UserRepository.findOneBy({ id: id });
    if (!user)
      throw new HttpException({ message: 'Not Found' }, HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: ObjectId, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.UserRepository.findOneBy({ id: id });

    if (!user)
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );

    delete user.password;

    const updated = Object.assign(user, dto);
    return await this.UserRepository.save(updated);
  }

  async delete(id: ObjectId): Promise<DeleteResult> {
    return await this.UserRepository.delete(id);
  }
}
