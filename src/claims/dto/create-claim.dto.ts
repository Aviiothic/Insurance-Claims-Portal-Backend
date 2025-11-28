import { IsNumber, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateClaimDto {
  @IsNumber()
  policyId: number;

  @IsNumber()
  claimAmt: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;
}
