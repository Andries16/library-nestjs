import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('comments')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Get()
  async getAll(): Promise<CommentEntity[]> {
    return await this.CommentService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateCommentDto): Promise<CommentEntity> {
    return await this.CommentService.create(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CommentEntity> {
    return await this.CommentService.getById(new ObjectId(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    return await this.CommentService.update(new ObjectId(id), dto);
  }

  @Roles(Role.User)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.CommentService.delete(new ObjectId(id));
  }
}
