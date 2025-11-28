import { PartialType } from '@nestjs/mapped-types';
import { CreateClaimDto } from './create-claim.dto';

import { IsString, IsOptional, MaxLength, IsNumber } from 'class-validator';

export class UpdateClaimDto {
  @IsOptional()
  @IsNumber()
  claimAmt?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;
}
