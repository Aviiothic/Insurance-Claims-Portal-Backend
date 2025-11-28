import { IsNumber, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateClaimDto {
  @IsOptional()
  @IsNumber()
  claimAmt?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;
}
