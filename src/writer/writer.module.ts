import { Module } from '@nestjs/common';
import { WriterController } from './writer.controller';
import { WriterService } from './writer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriterEntity } from './writer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WriterEntity])],
  controllers: [WriterController],
  providers: [WriterService],
})
export class WriterModule {}
