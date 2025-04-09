import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ProductReviewsService } from './product_reviews.service';
import { CreateProductReviewDto } from './dto/create-product_review.dto';
import { UpdateProductReviewDto } from './dto/update-product_review.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('product-reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Post('/:productId')
  @HttpCode(HttpStatus.OK)
  async create(@Req() req: any, @Param('productId') productId: string, @Body() createProductReviewDto: CreateProductReviewDto) {
    return await this.productReviewsService.create(req.user.sub, productId, createProductReviewDto);
  }

  @Get('/findAllOfProduct/:productId')
  @HttpCode(HttpStatus.OK)
  async findAllOfProduct(@Param('productId') productId: string) {
    return await this.productReviewsService.findAllOfProduct(productId);
  }

  @Get('/findAllOfUser/')
  @HttpCode(HttpStatus.OK)
  async findAllOfUser(@Req() req: any) {
    return await this.productReviewsService.findAllOfUser(req.user.sub);
  }

}
