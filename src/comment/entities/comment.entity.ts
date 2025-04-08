import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Product } from "../../product/entities/product.entity";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: string;

    @Column({ type: 'varchar', length: 500, nullable: false })
    content: string;

    @Column({ default: false })
    is_edited: boolean;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE', eager: true })
    user: User;

    @ManyToOne(() => Product, (product) => product.comments, { onDelete: 'CASCADE', eager: true })
    product: Product;

    @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE'})
    parent: Comment | null ;

    @OneToMany(() => Comment, (comment) => comment.parent)
    replies: Comment[];

    @CreateDateColumn()
    createdAt: Date;
}
