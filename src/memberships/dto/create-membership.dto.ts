import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateMembershipDto {
  @IsNotEmpty()
  idMember: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsUrl()
  linkSchooler: string;

  @IsNotEmpty()
  @IsUrl()
  linkScoopus: string;

  @IsNotEmpty()
  evidenceId: string;
}
