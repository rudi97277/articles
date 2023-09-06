import { ArrayNotEmpty, IsArray, IsNotEmpty, IsObject } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  coverId: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  documents: string[];
}
