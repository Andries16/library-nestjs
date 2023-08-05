import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { WriterEntity } from 'src/writer/writer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, WriterEntity])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
