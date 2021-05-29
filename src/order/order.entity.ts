import { UserEntity } from 'src/auth/user.entity';
import { AccountEntity } from 'src/product/account.entity';
import { KeyEntity } from 'src/product/key.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => ProductEntity, product => product.orders)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @OneToOne(() => KeyEntity)
  @JoinColumn({ name: 'keyId' })
  key: KeyEntity;

  @OneToOne(() => AccountEntity)
  @JoinColumn({ name: 'accountId' })
  account: AccountEntity;

  @ManyToOne(type => UserEntity, user => user.orders)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}