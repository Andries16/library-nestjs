import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BookEntity } from 'src/book/book.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { validateObject } from 'src/validator/validate';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly CommentRepository: Repository<CommentEntity>,
    @InjectRepository(BookEntity)
    private readonly BookRepository: Repository<BookEntity>,
  ) {}

  async getAll(): Promise<CommentEntity[]> {
    return await this.CommentRepository.find();
  }

  async create(dto: CreateCommentDto): Promise<CommentEntity> {
    const { book_id } = dto;

    const comment = new CommentEntity();
    comment.date = Date.now();
    comment.body = dto.body;

    await validateObject(comment);

    const book = await this.BookRepository.findOneBy({
      _id: new ObjectId(book_id),
    });
    if (!book) throw new NotFoundException(`Book with id ${book_id} not found`);

    book.comments.push(comment);
    return await this.CommentRepository.save(comment);
  }

  async getById(id: ObjectId): Promise<CommentEntity> {
    const comment = await this.CommentRepository.findOneBy({ _id: id });
    if (!comment)
      throw new NotFoundException(`Comment with id ${id} not found`);
    return comment;
  }

  async update(id: ObjectId, dto: UpdateCommentDto) {
    const comment = this.CommentRepository.findOneBy({ _id: id });
    if (!comment)
      throw new NotFoundException(`Comment with id ${id} not found`);
    const updated = Object.assign(comment, dto);

    await validateObject(updated);

    return await this.CommentRepository.save(updated);
  }

  async delete(id: ObjectId): Promise<DeleteResult> {
    return await this.CommentRepository.delete(id);
  }
}
