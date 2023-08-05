import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { validate } from 'class-validator';
import { ObjectId } from 'mongodb';
import { UpdateBookDto } from './dto/update-book.dto';
import { WriterEntity } from 'src/writer/writer.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly BookRepository: Repository<BookEntity>,
    @InjectRepository(WriterEntity)
    private readonly WriterRepository: Repository<WriterEntity>,
  ) {}

  async getAll(): Promise<BookEntity[]> {
    return await this.BookRepository.find();
  }

  async create(dto: CreateBookDto): Promise<BookEntity> {
    const { title, url, writer_id } = dto;

    const book = await this.BookRepository.findOne({
      where: { title: title, url: url },
    });
    if (book)
      throw new HttpException(
        { message: 'This book alerdy exist' },
        HttpStatus.BAD_REQUEST,
      );

    const newBook = new BookEntity();
    newBook.title = title;
    newBook.url = url;

    const errors = await validate(newBook);

    if (errors.length > 0)
      throw new HttpException(
        { message: 'Validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );

    const writer = await this.WriterRepository.findOneByOrFail({
      id: writer_id,
    });
    if (!writer)
      throw new HttpException(
        { message: 'Writer not found' },
        HttpStatus.BAD_REQUEST,
      );
    writer.books.push(newBook);

    return await this.BookRepository.save(newBook);
  }

  async getById(id: ObjectId): Promise<BookEntity> {
    return this.BookRepository.findOneBy({ id: id });
  }

  async update(id: ObjectId, dto: UpdateBookDto): Promise<BookEntity> {
    const book = await this.BookRepository.findOneBy({ id: id });

    if (!book)
      throw new HttpException({ message: 'Not found' }, HttpStatus.NOT_FOUND);

    const updated = Object.assign(book, dto);
    return await this.BookRepository.save(updated);
  }

  async delete(id: ObjectId): Promise<DeleteResult> {
    return await this.BookRepository.delete(id);
  }
}
