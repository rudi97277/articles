import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateAdministratorDto {
  @IsAlphanumeric()
  @MinLength(8)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  password: string;
}
