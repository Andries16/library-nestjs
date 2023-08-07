import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WriterEntity } from './writer.entity';
import { WriterService } from './writer.service';
import { CreateWriterDto } from './dto/create-writer.dto';
import { DeleteResult } from 'typeorm';
import { UpdateWriterDto } from './dto/update-writer.dto';
import { ObjectId } from 'mongodb';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('writers')
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
  @Roles(Role.Writer)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWriterDto,
  ): Promise<WriterEntity> {
    return await this.WriterService.update(new ObjectId(id), dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.WriterService.delete(new ObjectId(id));
  }
}
