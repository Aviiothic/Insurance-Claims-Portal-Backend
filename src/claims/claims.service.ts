import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim } from './entities/claims.entity';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private claimsRepository: Repository<Claim>,
  ) {}

  async createClaim(userId: number, dto: CreateClaimDto): Promise<Claim> {
    const claim = this.claimsRepository.create({ ...dto, userId });
    return await this.claimsRepository.save(claim);
  }

  async getAllClaims(userId: number): Promise<Claim[]> {
    return await this.claimsRepository.find({ where: { userId } });
  }

  async getClaimById(id: number, userId: number): Promise<Claim> {
    const claim = await this.claimsRepository.findOne({ where: { claimId: id, userId } });
    if (!claim) throw new NotFoundException('Claim not found');
    return claim;
  }

  async updateClaim(id: number, userId: number, dto: UpdateClaimDto): Promise<Claim> {
    const claim = await this.getClaimById(id, userId);
    if (claim.status !== 'Submitted') {
      throw new BadRequestException('Cannot update processed claim');
    }
    Object.assign(claim, dto);
    return await this.claimsRepository.save(claim);
  }

  async deleteClaim(id: number, userId: number): Promise<void> {
    const claim = await this.getClaimById(id, userId);
    if (claim.status !== 'Submitted') {
      throw new BadRequestException('Cannot delete processed claim');
    }
    await this.claimsRepository.remove(claim);
  }
}
