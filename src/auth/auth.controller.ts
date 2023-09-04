import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdministratorDto } from 'src/administrators/dto/login-administrator.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginAdministratorDto: LoginAdministratorDto) {
    const { username, pass } = loginAdministratorDto;
    return this.authService.login(username, pass);
  }
}
