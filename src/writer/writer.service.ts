import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WriterEntity } from './writer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class WriterService {
  constructor(
    @InjectRepository(WriterEntity)
    private readonly WriterRepository: Repository<WriterEntity>,
  ) {}

  async getAll(): Promise<WriterEntity[]> {
    return await this.WriterRepository.find({ where: { role: 1 } });
  }

  async create(dto: CreateWriterDto): Promise<WriterEntity> {
    const { email } = dto;

    const writer = await this.WriterRepository.findOneBy({ email: email });
    if (writer)
      throw new BadRequestException(`Writer with this email alerdy exist`);

    const newWriter = Object.assign(new WriterEntity(), dto);
    newWriter.role = 1;
    newWriter.books = [];
    return await this.WriterRepository.save(newWriter);
  }

  async getById(id: ObjectId): Promise<WriterEntity> {
    const writer = await this.WriterRepository.findOneBy({ _id: id, role: 1 });
    if (!writer) throw new NotFoundException(`Writer with id ${id} not found`);
    return writer;
  }

  async update(id: ObjectId, dto: UpdateWriterDto): Promise<WriterEntity> {
    const writer = await this.WriterRepository.findOneBy({ _id: id, role: 1 });
    if (!writer) throw new NotFoundException(`Writer with id ${id} not found`);
    delete writer.password;

    const updated = Object.assign(writer, dto);
    return await this.WriterRepository.save(updated);
  }

  async delete(id: ObjectId): Promise<DeleteResult> {
    const writer = await this.WriterRepository.findBy({ _id: id, role: 1 });
    if (!writer) throw new NotFoundException(`Writer with id ${id} not found`);
    return await this.WriterRepository.delete(id);
  }
}
