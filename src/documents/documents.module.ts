import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { JwtModule } from '@nestjs/jwt';
import { LoggerService } from 'src/services/logger.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.SECRET,
        signOptions: { expiresIn: '3h' },
      }),
    }),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, LoggerService],
  exports: [TypeOrmModule, DocumentsService, LoggerService],
})
export class DocumentsModule {}
