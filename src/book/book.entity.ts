import { CommentEntity } from 'src/comment/comment.entity';
import { WriterEntity } from 'src/writer/writer.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('books')
export class BookEntity {
  @ObjectIdColumn() id: ObjectId;
  @Column() title: string;
  @Column() url: string;

  @ManyToOne((type) => WriterEntity, (writer) => writer.books)
  writer: WriterEntity;

  @OneToMany((type) => CommentEntity, (comment) => comment.book)
  comments: CommentEntity[];
}
