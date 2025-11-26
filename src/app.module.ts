import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimsModule } from './claims/claims.module';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [ClaimsModule, PoliciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
