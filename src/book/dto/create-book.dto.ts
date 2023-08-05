import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateBookDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly url: string;

  @IsNotEmpty()
  readonly writer_id: ObjectId;
}
