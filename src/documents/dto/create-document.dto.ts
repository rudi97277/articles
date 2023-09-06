import { IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  administratorId: number;

  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  originalname: string;

  @IsNotEmpty()
  mimetype: string;

  @IsNotEmpty()
  size: number;
}
