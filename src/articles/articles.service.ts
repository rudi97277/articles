import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { In, Repository } from 'typeorm';
import { Document } from 'src/documents/entities/document.entity';
import { DocumentsService } from 'src/documents/documents.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    private readonly documentService: DocumentsService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const { documentIds, coverId, ...articleData } = createArticleDto;

    //validate documents and cover

    const [documents, cover] = await Promise.all([
      this.documentRepository.find({
        where: {
          id: In([documentIds]),
        },
      }),
      this.documentRepository.findOneBy({
        id: coverId,
      }),
    ]);

    if (documents.length !== documentIds.length || !cover)
      throw new HttpException('One or more document not found!', 422);

    const article = await this.articleRepository.save({
      ...articleData,
      cover: cover,
      documents: documents,
    });

    return article;
  }

  findAll() {
    return this.articleRepository.find({
      relations: ['cover'],
    });
  }

  findOne(id: number) {
    return this.articleRepository.findOne({
      relations: ['cover', 'documents'],
      where: {
        id,
      },
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.findOne(id);

    if (!article) throw new NotFoundException('Article not found!');

    const { cover, documents } = article;
    let { coverId, documentIds, ...data } = updateArticleDto;

    documentIds = documentIds ?? [];
    coverId = coverId && cover.id === coverId ? null : coverId;

    const deletedDocumentArticle = documents.filter(
      (document) => !documentIds.includes(document.id),
    );

    const [documentsCheck, coverCheck] = await Promise.all([
      this.documentRepository.find({
        where: {
          id: documentIds.length > 0 ? In([documentIds]) : '',
        },
      }),
      this.documentRepository.findOneBy({
        id: coverId ?? '',
      }),
    ]);

    Object.assign(article, data);

    if (coverId && coverCheck) article.cover = coverCheck;

    if (documentIds.length > 0 && documentsCheck)
      article.documents = documentsCheck;

    const articleUpdated = await this.articleRepository.save(article);

    //unlink & delete unused image

    if (coverId && coverCheck) this.documentService.delete([cover]);

    if (documentIds.length > 0 && deletedDocumentArticle)
      this.documentService.delete(deletedDocumentArticle);

    return articleUpdated;
  }

  async remove(id: number) {
    const article = await this.findOne(id);
    if (!article) throw new NotFoundException('Article not found!');
    const { cover, documents } = article;
    await this.articleRepository.remove(article);
    this.documentService.delete([cover, ...documents]);

    return {
      message: 'Article deleted!',
    };
  }
}
