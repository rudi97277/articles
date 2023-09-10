import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Document } from 'src/documents/entities/document.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => Document, { nullable: true })
  @JoinColumn()
  cover: Document;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToMany(() => Document, (document) => document.articles)
  @JoinTable()
  documents: Document[];
}
