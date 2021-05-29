import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'cases' })
export class CaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => ProductEntity, product => product.platform)
  products: ProductEntity[];

  @Column({ default: '' })
  title: string;

  @Column({ default: 0 })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}