import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdministratorsService } from 'src/administrators/administrators.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private administratorService: AdministratorsService) {}

  async login(username: string, pass: string): Promise<any> {
    const administrator = await this.administratorService.findOne(username);
    const isMatch = bcrypt.compare(pass, administrator?.password);
    if (!isMatch || !administrator) throw new UnauthorizedException();

    const { password, ...result } = administrator;

    return result;
  }
}
