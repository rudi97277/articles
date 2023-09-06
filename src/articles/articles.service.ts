import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { In, Repository } from 'typeorm';
import { ArticleDocument } from './entities/article-document.entity';
import { Document } from 'src/documents/entities/document.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(ArticleDocument)
    private articleDocumentRepository: Repository<ArticleDocument>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const { documents, coverId, ...articleData } = createArticleDto;

    const totalDocument: number = documents.length + 1;
    const allDocument = documents.concat(coverId);

    const documentCount = await this.documentRepository.count({
      where: {
        id: In([allDocument]),
      },
    });

    if (totalDocument !== documentCount)
      throw new HttpException('One or more document not found!', 422);

    const article = await this.articleRepository.save({
      ...articleData,
      coverId,
    });

    if (documents) {
      const formattedDocument = documents.map((document) => {
        return {
          documentId: document,
          articleId: article.id,
        };
      });

      await this.articleDocumentRepository.insert(formattedDocument);
    }

    return article;
  }

  findAll() {
    return `This action returns all artics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
