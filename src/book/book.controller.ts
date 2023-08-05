import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookEntity } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { ObjectId } from 'typeorm';

@Controller('books')
export class BookController {
  constructor(private readonly BookService: BookService) {}

  @Get()
  async getAll(): Promise<BookEntity[]> {
    return await this.BookService.getAll();
  }

  @Post()
  async createBook(@Body() dto: CreateBookDto): Promise<BookEntity> {
    return await this.BookService.create(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<BookEntity> {
    return await this.BookService.getById(new ObjectId(id));
  }
}
