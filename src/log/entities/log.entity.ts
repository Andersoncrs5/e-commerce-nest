// src/log/entities/log.entity.ts
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

// src/log/entities/log-type.enum.ts
export enum LogType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG'
}  

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.logs, { nullable: true, onDelete: 'SET NULL' })
  user: User;

  @Column()
  action: string;

  @Column({ type: 'enum', enum: LogType })
  log_type: LogType;

  @Column('text')
  message: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @Column({ name: 'ip_address', type: 'varchar', length: 50, nullable: true })
  ip_address?: string;

  @Column({ name: 'user_agent', type: 'varchar', length: 255, nullable: true })
  user_agent?: string;
}
