import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Repository } from 'typeorm';
import { DocumentsService } from 'src/documents/documents.service';
import { Document } from 'src/documents/entities/document.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    private documentService: DocumentsService,
  ) {}
  async create(createMembershipDto: CreateMembershipDto) {
    const { evidenceId, ...data } = createMembershipDto;

    const evidence = await this.documentRepository.findOneBy({
      id: evidenceId,
    });

    if (!evidence)
      throw new HttpException('One or more document not found!', 422);

    return this.membershipRepository.save({
      ...data,
      evidence: evidence,
    });
  }

  findAll() {
    return this.membershipRepository.find({
      relations: ['evidence'],
    });
  }

  async findOne(id: number) {
    const membership = await this.membershipRepository.findOne({
      relations: ['evidence'],
      where: { id },
    });

    if (!membership) throw new NotFoundException('member not found!');
    return membership;
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto) {
    const membership = await this.findOne(id);

    const { evidence } = membership;
    let { evidenceId, ...data } = updateMembershipDto;

    //check if evidenceId is the same as existing evidence
    evidenceId = evidenceId && evidenceId === evidence.id ? null : evidenceId;

    const evidenceCheck = await this.documentRepository.findOneBy({
      id: evidenceId ?? '',
    });

    Object.assign(membership, data);

    if (evidenceId && evidenceCheck) membership.evidence = evidenceCheck;

    const updatedMembership = await this.membershipRepository.save(membership);

    if (evidenceId && evidenceCheck) this.documentService.delete([evidence]);
    return updatedMembership;
  }

  async remove(id: number) {
    const membership = await this.findOne(id);

    const { evidence } = membership;
    await this.membershipRepository.remove(membership);

    this.documentService.delete([evidence]);

    return {
      message: 'membership deleted',
    };
  }
}
