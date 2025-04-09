import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { OrdersModule } from '@src/orders/orders.module';
import { AddressModule } from '@src/address/address.module';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping]), OrdersModule, AddressModule, UserModule],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
