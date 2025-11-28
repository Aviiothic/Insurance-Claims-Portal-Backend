import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsService } from './claims.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Claim } from './entities/claims.entity';
import { Repository } from 'typeorm';

describe('ClaimsService', () => {
  let service: ClaimsService;
  let repo: Repository<Claim>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsService,
        {
          provide: getRepositoryToken(Claim),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClaimsService>(ClaimsService);
    repo = module.get<Repository<Claim>>(getRepositoryToken(Claim));
  });

  it('should create a claim', async () => {
    const dto = { policyId: 1, claimAmt: 5000, description: 'Accident damage' };
    jest.spyOn(repo, 'save').mockResolvedValue({ ...dto, claimId: 1, userId: 1 } as Claim);
    const result = await service.createClaim(1, dto);
    expect(result.claimId).toBe(1);
  });
});
