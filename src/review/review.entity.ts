import { UserEntity } from 'src/auth/user.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'reviews' })
export class ReviewEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(type => ProductEntity, product => product.comments)
  product: ProductEntity;

  @ManyToOne(type => UserEntity, user => user.comments)
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}