import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { ObjectId } from 'mongodb';
import { UpdateBookDto } from './dto/update-book.dto';
import { WriterEntity } from 'src/writer/writer.entity';
import { validateObject } from 'src/validator/validate';

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

  async create(dto: CreateBookDto): Promise<BookEntity | any> {
    const { url, writer_id } = dto;

    const book = await this.BookRepository.findOne({
      where: { url: url },
    });
    if (book) throw new BadRequestException('This book alerdy exist');

    const newBook = Object.assign(new BookEntity(), dto);
    newBook.comments = [];
    await validateObject(newBook);

    const writer = await this.WriterRepository.findOneBy({
      _id: new ObjectId(writer_id),
      role: 1,
    });
    if (!writer)
      throw new NotFoundException(`Writer with id ${writer_id} not found`);
    writer.books.push(newBook);

    return await this.BookRepository.save(newBook);
  }

  async getById(id: ObjectId): Promise<BookEntity> {
    const book = await this.BookRepository.findOneBy({ _id: id });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  async update(id: ObjectId, dto: UpdateBookDto): Promise<BookEntity> {
    const book = await this.BookRepository.findOneBy({ _id: id });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    const updated = Object.assign(book, dto);
    return await this.BookRepository.save(updated);
  }

  async delete(id: ObjectId): Promise<DeleteResult> {
    return await this.BookRepository.delete(id);
  }
}
