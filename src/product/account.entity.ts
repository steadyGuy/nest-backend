import { IsEmail } from 'class-validator';
import { OrderEntity } from 'src/order/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlatformEntity } from './platform.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'accounts' })
export class AccountEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => ProductEntity, product => product.accounts)
  product: ProductEntity;

  @ManyToOne(type => PlatformEntity, platform => platform.accounts)
  @JoinColumn({ name: 'platformId' })
  platform: PlatformEntity;

  @Column({ default: '' })
  email_password: string;

  @Column({ unique: true, default: null })
  @IsEmail()
  email: string;

  // @Column({ unique: true, default: null })
  // steamid: string;

  @Column({ default: '' })
  platform_password: string;

  // @OneToMany(type => PlatformEntity, platform => platform.product, { eager: true })
  // platforms: PlatformEntity[];

  // @OneToMany(type => OrderEntity, order => order.key, { eager: true })
  // orders: OrderEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}