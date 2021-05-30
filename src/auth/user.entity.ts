import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { OrderEntity } from 'src/order/order.entity';
import { ReviewEntity } from 'src/review/review.entity';
// import { OrderEntity } from 'src/order/order.entity';
// 'simple-array'
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @Column({ unique: true })
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

  @OneToMany(type => OrderEntity, order => order.user, { eager: true })
  orders: OrderEntity[];

  @OneToMany(type => ReviewEntity, comment => comment.user, { eager: true })
  comments: ReviewEntity[];

  @Column({ default: 0 })
  wastedBalance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
