import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private administratorService: AdministratorsService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    const administrator = await this.administratorService.findOne(username);

    const isMatch =
      administrator && (await bcrypt.compare(pass, administrator?.password));

    if (!isMatch) throw new UnauthorizedException();

    const payload = { sub: administrator.id, username: administrator.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      full_name: administrator.fullName,
    };
  }
}
