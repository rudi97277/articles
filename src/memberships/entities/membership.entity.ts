import { Document } from 'src/documents/entities/document.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idMember: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  linkSchooler: string;

  @Column()
  linkScoopus: string;

  @OneToOne(() => Document, { nullable: true })
  @JoinColumn()
  evidence: Document;
}
