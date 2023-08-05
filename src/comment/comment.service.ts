import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BookEntity } from 'src/book/book.entity';
import { validate } from 'class-validator';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  async create(id: ObjectId, dto: CreateCommentDto): Promise<CommentEntity> {
    const { body, book_id } = dto;

    const comment = new CommentEntity();
    comment.date = Date.now();
    comment.body = dto.body;

    const errors = await validate(comment);

    if (errors.length > 0)
      throw new HttpException(
        { message: 'Validation failed' },
        HttpStatus.BAD_REQUEST,
      );

    const book = await this.BookRepository.findOneBy({ id: book_id });
    book.comments.push(comment);
    return await this.CommentRepository.save(comment);
  }

  async getById(id: ObjectId): Promise<CommentEntity> {
    return await this.CommentRepository.findOneBy({ id: id });
  }

  async update(id: ObjectId, dto: UpdateCommentDto) {
    const comment = this.CommentRepository.findOneBy({ id: id });
    const updated = Object.assign(comment, dto);

    return await this.CommentRepository.save(updated);
  }

  async delete(id: ObjectId): Promise<DeleteResult> {
    return await this.CommentRepository.delete(id);
  }
}
