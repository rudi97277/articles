import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdministratorDto } from 'src/administrators/dto/login-administrator.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginAdministratorDto: LoginAdministratorDto) {
    const { username, pass } = loginAdministratorDto;
    return this.authService.login(username, pass);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    const { password, ...data } = req.administrator;
    return data;
  }
}
