import { Administrator } from 'src/administrators/entities/administrator.entity';
import { Article } from 'src/articles/entities/article.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Administrator)
  @JoinColumn()
  administrator: Administrator;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToMany(() => Article, (article) => article.documents)
  articles: Article[];
}
