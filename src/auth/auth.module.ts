import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { Administrator } from 'src/administrators/entities/administrator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Administrator]),
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.SECRET,
        signOptions: { expiresIn: '600s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdministratorsService],
  exports: [AuthService],
})
export class AuthModule {}
