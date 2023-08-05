import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'typeorm';

export class CreateCommentDto {
  @IsNotEmpty()
  readonly body: string;
  @IsNotEmpty()
  readonly book_id: ObjectId;
}
