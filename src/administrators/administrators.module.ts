import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';

@Module({
  providers: [AdministratorsService],
  exports: [AdministratorsService],
})
export class AdministratorsModule {}
