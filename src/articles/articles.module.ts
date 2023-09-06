import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleDocument } from './entities/article-document.entity';
import { JwtModule } from '@nestjs/jwt';
import { Document } from 'src/documents/entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleDocument, Document]),
    JwtModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
