import { ObjectId } from 'mongodb';

export class UpdateBookDto {
  readonly title: string;
  readonly url: string;
}
