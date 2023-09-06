import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './article.entity';
import { Document } from 'src/documents/entities/document.entity';

@Entity('article_documents')
export class ArticleDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'document_id', type: 'varchar', length: 36 })
  documentId: string;

  @Column({ name: 'article_id' })
  articleId: number;

  @ManyToOne((type) => Article, (article) => article.id)
  @JoinColumn({ name: 'article_id' })
  article: Article;

  @OneToOne((type) => Document, (document) => document.id)
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;
}
