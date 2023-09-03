import { Injectable } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectRepository(Administrator)
    private readonly administratorRepository: Repository<Administrator>,
  ) {}
  create(createAdministratorDto: CreateAdministratorDto) {
    return this.administratorRepository.save(createAdministratorDto);
  }

  findAll() {
    return this.administratorRepository.find();
  }

  findOne(id: number) {
    return this.administratorRepository.findOneBy({ id });
  }

  update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorRepository.update(id, updateAdministratorDto);
  }

  remove(id: number) {
    return this.administratorRepository.delete(id);
  }
}
