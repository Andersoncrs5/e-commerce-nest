import { Product } from '@src/product/entities/product.entity';
import { User } from '@src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity('product_reviews')
export class ProductReview {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE', eager:true } )
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE', eager:true } )
  user: User;

  @Column('numeric', { precision: 2, scale: 1 })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
