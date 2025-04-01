import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, nullable: false })
    zip_code: string

    @Column({ unsigned: true, nullable: false })
    number_house: number;

    @Column({ type : 'varchar', length: 150 })
    street: string
    
    @Column({ type : 'varchar', length: 250 })
    neighborhood: string

    @Column({ type : 'varchar', length: 250 })
    city: string

    @Column({ type : 'varchar', length: 250 })
    state: string

    @Column({ type : 'varchar', length: 250 })
    country: string

    @Column({ type : 'varchar', length: 500 })
    complement: string

    @OneToOne(() => User, (user) => user.address, { onDelete : 'CASCADE' })
    @JoinColumn({  })
    user: User;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}
