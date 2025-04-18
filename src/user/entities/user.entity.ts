import { Favorite } from '../../favorite/entity/favorite.entity';
import { CryptoService } from '../../../CryptoService';
import { Address } from '../../address/entities/address.entity';
import { Category } from '../../category/entities/category.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Product } from '../../product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cart } from '@src/cart/entities/cart.entity';
import { Order } from '@src/orders/entities/order.entity';
import { Log } from '@src/log/entities/log.entity';
import { ProductReview } from '@src/product_reviews/entities/product_review.entity';
import { DiscountCoupon } from '@src/discount_coupons/entities/discount_coupon.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 400 })
  password: string;

  @Column({ default: false })
  is_adm: boolean;

  @Column({ nullable: true, type: 'text' })
  refreshToken: string | null

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => ProductReview, (ProductReview) => ProductReview.user)
  reviews: ProductReview[];

  @OneToMany(() => Favorite, (Favorite) => Favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Product, (Product) => Product.user)
  products: Product[];

  @OneToMany(() => Order, (Order) => Order.user)
  orders: Order[];

  @OneToMany(() => Cart, (Cart) => Cart.user)
  carts: Cart[];

  @OneToMany(() => Log, (Log) => Log.user)
  logs: Log[];

  @OneToMany(() => DiscountCoupon, (dis) => dis.user)
  coupons: DiscountCoupon[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
      if (this.password) {
          this.password = await CryptoService.encrypt(this.password);
      }
  }

}
