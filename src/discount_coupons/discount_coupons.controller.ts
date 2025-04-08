import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountCouponsService } from './discount_coupons.service';
import { CreateDiscountCouponDto } from './dto/create-discount_coupon.dto';
import { UpdateDiscountCouponDto } from './dto/update-discount_coupon.dto';

@Controller('discount-coupons')
export class DiscountCouponsController {
  constructor(private readonly discountCouponsService: DiscountCouponsService) {}

  @Post()
  async create(@Body() createDiscountCouponDto: CreateDiscountCouponDto) {
    return await this.discountCouponsService.create(createDiscountCouponDto);
  }

  @Get()
  async findAll() {
    return await this.discountCouponsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.discountCouponsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDiscountCouponDto: UpdateDiscountCouponDto) {
    return await this.discountCouponsService.update(+id, updateDiscountCouponDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.discountCouponsService.remove(+id);
  }

  @Get('/checkActivedCoupon/:id')
  async checkActivedCoupon(@Param('id') id: string) {
    return await this.discountCouponsService.checkActivedCoupon(+id);
  }

}