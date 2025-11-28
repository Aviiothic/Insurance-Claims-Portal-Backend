import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/claims')
@UseGuards(JwtAuthGuard)
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateClaimDto) {
    return this.claimsService.createClaim(req.user.userId, dto);
  }

  @Get()
  findAll(@Req() req) {
    return this.claimsService.getAllClaims(req.user.userId);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: number) {
    return this.claimsService.getClaimById(id, req.user.userId);
  }

  @Put(':id')
  update(@Req() req, @Param('id') id: number, @Body() dto: UpdateClaimDto) {
    return this.claimsService.updateClaim(id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: number) {
    return this.claimsService.deleteClaim(id, req.user.userId);
  }
}
