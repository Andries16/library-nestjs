import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WriterEntity } from './writer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ObjectId, Repository } from 'typeorm';
import { CreateWriterDto } from './dto/create-writer.dto';
import { validate } from 'class-validator';
import { UpdateWriterDto } from './dto/update-writer.dto';

@Injectable()
export class WriterService {
  constructor(
    @InjectRepository(WriterEntity)
    private readonly WriterRepository: Repository<WriterEntity>,
  ) {}

  async getAll(): Promise<WriterEntity[]> {
    return this.WriterRepository.find();
  }

  async create(dto: CreateWriterDto): Promise<WriterEntity> {
    const { name, email, password } = dto;

    const writer = this.WriterRepository.findOneBy({ email: email });

    if (writer)
      throw new HttpException(
        { message: 'Alerdy exist' },
        HttpStatus.BAD_REQUEST,
      );

    const newWriter = new WriterEntity();
    newWriter.email = email;
    newWriter.name = name;
    newWriter.password = password;
    newWriter.role = 1;
    newWriter.books = [];

    const errors = await validate(newWriter);
    if (errors.length > 0)
      throw new HttpException(
        { message: 'Validation failed' },
        HttpStatus.BAD_REQUEST,
      );

    return await this.WriterRepository.save(newWriter);
  }

  async getById(id: ObjectId): Promise<WriterEntity> {
    return this.WriterRepository.findOneByOrFail({ id: id });
  }
  async update(id: ObjectId, dto: UpdateWriterDto): Promise<WriterEntity> {
    const writer = await this.WriterRepository.findOneBy({ id: id });
    if (!writer)
      throw new HttpException({ message: 'not found' }, HttpStatus.NOT_FOUND);

    delete writer.password;
    delete writer.books;

    const updated = Object.assign(writer, dto);
    return await this.WriterRepository.save(updated);
  }

  async delete(id: ObjectId): Promise<DeleteResult> {
    return await this.WriterRepository.delete(id);
  }
}
