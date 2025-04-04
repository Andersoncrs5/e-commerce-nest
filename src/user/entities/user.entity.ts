import { Favorite } from '../../favorite/entity/favorite.entity';
import { CryptoService } from '../../../CryptoService';
import { Address } from '../../address/entities/address.entity';
import { Category } from '../../category/entities/category.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Product } from '../../product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
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

  @OneToMany(() => Favorite, (Favorite) => Favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Product, (Product) => Product.user)
  products: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
      if (this.password) {
          this.password = await CryptoService.encrypt(this.password);
      }
  }

}
