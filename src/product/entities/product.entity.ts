import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
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

    @Column({ unsigned: true, nullable: false, type: 'numeric', precision: 5, scale: 2 })
    price: number;

    @ManyToOne(() => User, (user) => user.products, { nullable: false, eager: true }) 
    user: User;

    @ManyToOne(() => Category, (category) => category.products, { nullable: false, eager: true }) 
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
