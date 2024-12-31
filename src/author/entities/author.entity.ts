import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Authors' })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'enum', enum: ['m', 'f'] })
  gender: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
