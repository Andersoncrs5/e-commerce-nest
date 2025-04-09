import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { DiscountCouponsService } from './discount_coupons.service';
import { CreateDiscountCouponDto } from './dto/create-discount_coupon.dto';
import { UpdateDiscountCouponDto } from './dto/update-discount_coupon.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';
import { RolesGuard } from '@src/auth/Guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('discount-coupons')
export class DiscountCouponsController {
  constructor(private readonly discountCouponsService: DiscountCouponsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async create(@Body() createDiscountCouponDto: CreateDiscountCouponDto) {
    return await this.discountCouponsService.create(createDiscountCouponDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  async findAll() {
    return await this.discountCouponsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: string) {
    return await this.discountCouponsService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() updateDiscountCouponDto: UpdateDiscountCouponDto) {
    return await this.discountCouponsService.update(+id, updateDiscountCouponDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.discountCouponsService.remove(+id);
  }

  @Get('/checkActivedCoupon/:id')
  @HttpCode(HttpStatus.OK)
  async checkActivedCoupon(@Param('id') id: string) {
    return await this.discountCouponsService.checkActivedCoupon(+id);
  }

}