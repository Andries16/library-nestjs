import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { WriterEntity } from './writer.entity';
import { WriterService } from './writer.service';
import { CreateWriterDto } from './dto/create-writer.dto';
import { ObjectId } from 'typeorm';

@Controller('writer')
export class WriterController {
  constructor(private readonly WriterService: WriterService) {}

  @Get()
  async getAll(): Promise<WriterEntity[]> {
    return await this.WriterService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateWriterDto): Promise<WriterEntity> {
    return await this.WriterService.create(dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<WriterEntity> {
    return await this.WriterService.getById(new ObjectId(id));
  }
}
