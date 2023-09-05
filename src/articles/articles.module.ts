import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleDocument } from './entities/article-document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([ArticleDocument]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
