import { Expose } from 'class-transformer';
import { Document } from 'src/documents/entities/document.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'varchar',
    length: 36,
    name: 'cover_id',
  })
  @Expose({
    name: 'cover_id',
  })
  coverId: string;

  @OneToOne(() => Document, (document) => document.id)
  @JoinColumn({ name: 'cover_id' })
  cover: Document;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  @Expose({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  @Expose({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => Document, (document) => document.id)
  documents: Document[];
}
