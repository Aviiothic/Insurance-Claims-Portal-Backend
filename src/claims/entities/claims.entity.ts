import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from 'src/user/entities/user.entity';
import { Policy } from 'src/policies/entities/policy.entity';

@Entity('claims')
export class Claim {
  @PrimaryGeneratedColumn()
  claimId: number;

  @Column()
  policyId: number;

  @Column()
  userId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  claimAmt: number;

  @Column({ length: 200 })
  description: string;

  @Column({ length: 20, default: 'Submitted' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  submittedAt: Date;

  @ManyToOne(() => Policy, (policy) => policy.claims)
  @JoinColumn({ name: 'policyId' })
  policy: Policy;

  @ManyToOne(() => User, (user) => user.claims)
  @JoinColumn({ name: 'userId' })
  user: User;
}
