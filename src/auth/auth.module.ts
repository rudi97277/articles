import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdministratorsModule } from 'src/administrators/administrators.module';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    AdministratorsModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.SECRET,
        signOptions: { expiresIn: '3h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule, AdministratorsModule],
})
export class AuthModule {}
