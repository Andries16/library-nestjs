import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongodb';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.getById(new ObjectId(id));
  }
}
