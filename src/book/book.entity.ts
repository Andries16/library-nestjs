import { CommentEntity } from 'src/comment/comment.entity';
import { WriterEntity } from 'src/writer/writer.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
@Entity('books')
export class BookEntity {
  @ObjectIdColumn() _id: ObjectId;
  @Column() title: string;
  @Column() url: string;

  @ManyToOne(() => WriterEntity, (writer) => writer.books)
  @Column()
  writer_id: WriterEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.book)
  @Column()
  comments: CommentEntity[];
}
