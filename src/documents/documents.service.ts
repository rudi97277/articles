import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import * as fs from 'fs';
import * as winston from 'winston';
import { LoggerService } from 'src/services/logger.services';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    private readonly loggerService: LoggerService,
  ) {}
  create(createDocumentDto: CreateDocumentDto) {
    let { path, ...data } = createDocumentDto;
    path = path.replace('public\\', '');
    return this.documentRepository.save({ ...data, path });
  }

  delete(documents: Document[]) {
    documents.forEach((document) => {
      fs.unlink(`public\\${document.path}`, (err) => {
        if (err)
          this.loggerService.error(
            `Error deleting file: ${err.message}`,
            err.stack,
          );
      });
    });
    this.documentRepository.remove(documents);
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }
}
