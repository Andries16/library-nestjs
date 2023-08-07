import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookEntity } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { DeleteResult } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';

@Controller('books')
export class BookController {
  constructor(private readonly BookService: BookService) {}

  @Get()
  async getAll(): Promise<BookEntity[]> {
    return await this.BookService.getAll();
  }

  @Roles(Role.Writer)
  @Post()
  async createBook(@Body() dto: CreateBookDto): Promise<BookEntity> {
    return await this.BookService.create(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<BookEntity> {
    return await this.BookService.getById(new ObjectId(id));
  }
  @Roles(Role.Writer, Role.User)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBookDto,
  ): Promise<BookEntity> {
    return await this.BookService.update(new ObjectId(id), dto);
  }

  @Roles(Role.Writer, Role.User)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.BookService.delete(new ObjectId(id));
  }
}
