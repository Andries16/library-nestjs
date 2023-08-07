import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.UserRepository.find({ where: { role: 2 } });
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const { email } = dto;
    const user = await this.UserRepository.findOneBy({ email: email });
    if (user)
      throw new BadRequestException(`User with this email alerdy exist`);

    const NewUser = Object.assign(new UserEntity(), dto);
    NewUser.role = 2;

    return this.UserRepository.save(NewUser);
  }

  async getById(id: ObjectId): Promise<UserEntity> {
    const user = await this.UserRepository.findOneBy({ _id: id, role: 2 });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: ObjectId, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.UserRepository.findOneBy({ _id: id, role: 2 });
    if (!user) throw new NotFoundException(`User with ud ${id} not found`);
    delete user.password;

    const updated = Object.assign(user, dto);
    return await this.UserRepository.save(updated);
  }

  async delete(id: ObjectId): Promise<DeleteResult> {
    const user = await this.UserRepository.findOneBy({ _id: id, role: 2 });

    if (!user) throw new NotFoundException(`User with ud ${id} not found`);
    return await this.UserRepository.delete({ _id: id, role: 2 });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.UserRepository.findOneBy({ email: email, role: 2 });
  }
}
