import { Product } from '@src/product/entities/product.entity';
import { User } from '@src/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  
  
  export enum SaleStatus {
    WAITING_RESPONSE = 'waiting_response',
    PENDING_PAYMENT = 'pending_payment',
    PAYMENT_COMPLETED = 'payment_completed',
    CANCELLED = 'cancelled',
    REFUSED = 'refused',
  }
  
  export enum ShippingStatus {
    PENDING_PAYMENT = 'pending_payment',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    RETURNED = 'returned',
    CANCELLED = 'cancelled',
    COMPLETE = 'COMPLETE'
  }
  
  @Entity('orders')
  export class Order {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;
  
    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @ManyToOne(() => Product, (Product) => Product.orders, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'productId' })
    product: Product;
  
    @Column({ type: 'int', default: 1 })
    quantity: number;
  
    @Column({ type: 'numeric', precision: 5, scale: 2 })
    value: number;
  
    @Column({
      type: 'enum',
      enum: SaleStatus,
      default: SaleStatus.PENDING_PAYMENT,
    })
    sale_status: SaleStatus;
  
    @Column({
      type: 'enum',
      enum: ShippingStatus,
      default: ShippingStatus.PENDING_PAYMENT,
    })
    shipping_status: ShippingStatus;
  
    @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
    createdAt: Date;
  }  