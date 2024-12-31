import { Author } from 'src/author/entities/author.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'] })
  difficulty: string;

  @Column({ type: 'int' })
  estimatedTime: number;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'int', default: 0 })
  totalVote: number;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
