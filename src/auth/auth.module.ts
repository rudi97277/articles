import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { Administrator } from 'src/administrators/entities/administrator.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Administrator])],
  controllers: [AuthController],
  providers: [AuthService, AdministratorsService],
})
export class AuthModule {}
