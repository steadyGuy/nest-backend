import { OrderEntity } from 'src/order/order.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { CaseEntity } from '../case/case.entity';
import { KeyEntity } from './key.entity';
import { PlatformEntity } from './platform.entity';

@Entity({ name: 'products' })
export class ProductEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: '' })
  photo: string;

  @OneToMany(type => KeyEntity, key => key.product, { eager: false, nullable: true, cascade: ['update'] },)
  keys: KeyEntity[];

  @OneToMany(type => OrderEntity, order => order.product, { eager: false, nullable: true, cascade: ['update'] },)
  orders: OrderEntity[];

  @OneToMany(type => AccountEntity, account => account.product, { eager: false })
  accounts: AccountEntity[];

  @OneToMany(type => ReviewEntity, comment => comment.product, { eager: false })
  comments: ReviewEntity[];

  @ManyToOne(type => PlatformEntity, { eager: false })
  platform: PlatformEntity;

  @ManyToOne(type => CaseEntity, { nullable: true, eager: false })
  case: CaseEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;

  @Column()
  date: Date;
}