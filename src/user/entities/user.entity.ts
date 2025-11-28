import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//import { Policy } from './policy.entity';
//import { Claim } from './claim.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  name: string;

  // store hashed refresh token (nullable)
  @Column({ nullable: true, length: 255 })
  refreshTokenHash: string | null;

  // optional role for authorization demo
  @Column({ length: 50, default: 'user' })
  role: string;

//   @OneToMany(() => Policy, (policy) => policy.user)
//   policies: Policy[];

//   @OneToMany(() => Claim, (claim) => claim.user)
//   claims: Claim[];
}