import { Module } from '@nestjs/common';
import { DiscountCouponsService } from './discount_coupons.service';
import { DiscountCouponsController } from './discount_coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCoupon } from './entities/discount_coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountCoupon])],
  controllers: [DiscountCouponsController],
  providers: [DiscountCouponsService],
})
export class DiscountCouponsModule {}
