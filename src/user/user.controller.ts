import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongodb';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Roles(Role.User)
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.getById(new ObjectId(id));
  }

  @Roles(Role.User)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.update(new ObjectId(id), dto);
  }

  @Roles(Role.User)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.delete(new ObjectId(id));
  }
}
