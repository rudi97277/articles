import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { mysqlError } from 'src/config/mysql-error-config';
@Controller('articles')
@UseGuards(AuthGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto).catch((err) => {
      throw new HttpException(mysqlError[err.code] ?? err.message ?? err, 422);
    });
  }

  @Get()
  async findAll() {
    const articles = await this.articlesService.findAll();
    if (articles.length === 0) throw new NotFoundException();
    return articles;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOne(+id);
    if (!article) throw new NotFoundException('Article not found!');
    return article;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
