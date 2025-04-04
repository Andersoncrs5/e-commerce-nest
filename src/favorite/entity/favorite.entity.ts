import { Product } from "../../../src/product/entities/product.entity";
import { User } from "../../../src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.favorites, { nullable: false, eager: true }) 
    user: User;

    @ManyToOne(() => Product, (product) => product.favorites, { nullable: false, eager: true }) 
    product: Product;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}