import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}
  create(createDocumentDto: CreateDocumentDto) {
    return this.documentRepository.save(createDocumentDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }
}
