import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'platforms' })
export class PlatformEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => ProductEntity, product => product.platform)
  products: ProductEntity[];

  @OneToMany(type => AccountEntity, account => account.platform)
  accounts: AccountEntity[];

  @Column({ default: 'steam' })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}