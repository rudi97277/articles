import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Request,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { imageFileFilter, storage } from 'src/config/storage.config';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { storage, fileFilter: imageFileFilter }),
  )
  async uploadedFile(@UploadedFile() file, @Request() req) {
    if (file === undefined || file === null)
      throw new ConflictException('File must be present!');

    const document = this.documentsService.create({
      ...file,
      administrator: req.administrator,
    });
    return document;
  }
  @Get(':id')
  getFile(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }
}
