import { Module } from '@nestjs/common';
import { DiscountCouponsService } from './discount_coupons.service';
import { DiscountCouponsController } from './discount_coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCoupon } from './entities/discount_coupon.entity';
import { ValidsModule } from '@src/valids/valids.module';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountCoupon]), ValidsModule],
  controllers: [DiscountCouponsController],
  providers: [DiscountCouponsService],
})
export class DiscountCouponsModule {}
