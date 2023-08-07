import { BookEntity } from 'src/book/book.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @ObjectIdColumn() _id: ObjectId;
  @Column() date: number;
  @Column() body: string;

  @ManyToOne(() => BookEntity, (book) => book.comments)
  book: BookEntity;
}
