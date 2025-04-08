import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '@src/product/product.module';
import { UserModule } from '@src/user/user.module';
import { Product } from '@src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product]), ProductModule, UserModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
