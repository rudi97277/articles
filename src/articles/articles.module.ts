import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsModule } from 'src/documents/documents.module';
import { AdministratorsModule } from 'src/administrators/administrators.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    DocumentsModule,
    AdministratorsModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
