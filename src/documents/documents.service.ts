import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}
  uploadFile(file: Express.Multer.File) {
    console.log(file);

    return 'This action adds a new document';
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }
}
