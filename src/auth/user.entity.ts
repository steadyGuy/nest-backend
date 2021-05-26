import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
// 'simple-array'
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Column({ unique: true })
  username: string;

  @Column({ unique: true, default: null })
  @IsEmail()
  email: string;

  @Column({ unique: true, default: null })
  steamid: string;

  @Column({ default: '' })
  passwordHash: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  orders: number;

  @Column({ default: 0 })
  wastedBalance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
