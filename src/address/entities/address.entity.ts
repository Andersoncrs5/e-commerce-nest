import { Shipping } from "@src/shipping/entities/shipping.entity";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(() => Shipping, (ship) => ship.address, { cascade: true, onDelete : 'CASCADE' })
    shippings: Shipping[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}
