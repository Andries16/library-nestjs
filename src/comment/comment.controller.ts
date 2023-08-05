import { Controller, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from './comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Get()
  async getAll(): Promise<CommentEntity[]> {
    return await this.CommentService.getAll();
  }
}
