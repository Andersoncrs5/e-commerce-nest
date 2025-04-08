import { PartialType } from '@nestjs/swagger';
import { CreateDiscountCouponDto } from './create-discount_coupon.dto';

export class UpdateDiscountCouponDto extends PartialType(CreateDiscountCouponDto) {}
