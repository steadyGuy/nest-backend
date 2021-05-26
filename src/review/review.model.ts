import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Review' })
export class ReviewModel {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  user: string;
}