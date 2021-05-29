import { OrderEntity } from 'src/order/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'keys' })
export class KeyEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  code: string;

  @ManyToOne(type => ProductEntity, product => product.keys, { nullable: true, cascade: ["update"] })
  product: ProductEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // @OneToMany(type => OrderEntity, order => order.key, { eager: true })
  // orders: OrderEntity[];

}