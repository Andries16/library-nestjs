import { ObjectId } from 'mongodb';
import { BookEntity } from 'src/book/book.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @ObjectIdColumn() id: ObjectId;
  @Column() date: number;
  @Column() body: string;

  @ManyToOne((type) => BookEntity, (book) => book.comments)
  book: BookEntity;
}
