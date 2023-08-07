import { Column, Entity, OneToMany } from 'typeorm';
import { BookEntity } from 'src/book/book.entity';
import { UserEntity } from 'src/user/user.entity';

@Entity('users')
export class WriterEntity extends UserEntity {
  @OneToMany(() => BookEntity, (book) => book.writer_id)
  @Column()
  books: BookEntity[];
}
