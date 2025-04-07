import { Comment } from "../../comment/entities/comment.entity";
import { Category } from "../../category/entities/category.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Favorite } from "../../favorite/entity/favorite.entity";
import { Cart } from "@src/cart/entities/cart.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 300, nullable: false })
    image: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @Column({ unsigned: true, nullable: false, default: 0 })
    quantity: number;

    @Column({ unsigned: true, nullable: false, default: 0 })
    sold: number;

    @Column({ default: false, nullable: false })
    is_active: boolean = false;

    @Column({ unsigned: true, nullable: false, default: 0 })
    viewed: number;

    @Column({ type: 'bigint', unique: true })
    unique_code: number;

    @Column({ unsigned: true, nullable: false, type: 'numeric', precision: 8, scale: 2 })
    price: number;

    @ManyToOne(() => User, (user) => user.products, { nullable: false, eager: true }) 
    user: User;

    @OneToMany(() => Favorite, (Favorite) => Favorite.product)
    favorites: Favorite[];

    @OneToMany(() => Comment, (comment) => comment.product, { cascade: true })
    comments: Comment[];

    @OneToMany(() => Cart, (Cart) => Cart.product)
    carts: Cart[];

    @ManyToOne(() => Category, (category) => category.products, { nullable: false, eager: true }) 
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
