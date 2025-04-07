import { Product } from "@src/product/entities/product.entity";
import { User } from "@src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.carts, { nullable: false, eager: true }) 
    user: User;

    @ManyToOne(() => Product, (product) => product.carts, { nullable: false, eager: true }) 
    product: Product;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
