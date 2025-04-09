import { Order } from '@src/orders/entities/order.entity';
import { Address } from '@src/address/entities/address.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum ShippingStatus {
  PENDING_PAYMENT = 'pending_payment',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
  CANCELLED = 'cancelled',
  COMPLETE = 'complete'
}

@Entity('shipping')
export class Shipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Address, (address) => { address.shippings })
  @JoinColumn({ name: 'address' })
  address: Address;

  @Column({ name: 'shipping_method', type: 'varchar', length: 100 })
  shippingMethod: string;

  @Column({ name: 'tracking_number', type: 'varchar', length: 100, nullable: true })
  trackingNumber?: string;

  @Column({
    type: 'enum',
    enum: ShippingStatus,
    default: ShippingStatus.PENDING_PAYMENT,
  })
  status: ShippingStatus;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;
}
