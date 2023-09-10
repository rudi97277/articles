import { IsNotEmpty } from 'class-validator';

export class LoginAdministratorDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  pass: string;
}
