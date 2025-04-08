import { Product } from "../../product/entities/product.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', length: 200, unique: true, nullable: false })
    name: string;

    @Column({ default: false })
    is_active: boolean;

    @ManyToOne(() => User, (user) => user.categories, { nullable: false, eager: true }) 
    user: User;

    @OneToMany(() => Product, (Product) => Product.user)
    products: Product[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
