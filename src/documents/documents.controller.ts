import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, storage } from 'src/storage.config';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { storage, fileFilter: imageFileFilter }),
  )
  async uploadedFile(@UploadedFile() file, @Request() req) {
    const { sub } = req.administrator;

    const document = this.documentsService.create({
      ...file,
      administratorId: sub,
    });
    return document;
  }
  @Get(':id')
  getFile(@Param('id') id: string) {
    return this.documentsService.findOne(+id);
  }
}
