import { Administrator } from 'src/administrators/entities/administrator.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'administrator_id' })
  administratorId: number;

  @ManyToOne((type) => Administrator, (administrator) => administrator.id)
  @JoinColumn({ name: 'administrator_id' })
  administrator: Administrator;

  @Column({
    name: 'file_name',
  })
  fileName: string;

  @Column({
    name: 'original_file_name',
  })
  originalFileName: string;

  @Column({
    name: 'mime_type',
  })
  memeType: string;

  @Column()
  size: string;

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
