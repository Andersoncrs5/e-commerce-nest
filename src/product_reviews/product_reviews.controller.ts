import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductReviewsService } from './product_reviews.service';
import { CreateProductReviewDto } from './dto/create-product_review.dto';
import { UpdateProductReviewDto } from './dto/update-product_review.dto';

@Controller('product-reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Post(':userId/:productId')
  @HttpCode(HttpStatus.OK)
  async create(@Param('userId') userId: string, @Param('productId') productId: string, @Body() createProductReviewDto: CreateProductReviewDto) {
    return await this.productReviewsService.create(+userId, productId, createProductReviewDto);
  }

  @Get('/findAllOfProduct/:productId')
  @HttpCode(HttpStatus.OK)
  async findAllOfProduct(@Param('productId') productId: string) {
    return await this.productReviewsService.findAllOfProduct(productId);
  }

  @Get('/findAllOfUser/:userId')
  @HttpCode(HttpStatus.OK)
  async findAllOfUser(@Param('userId') userId: string) {
    return await this.productReviewsService.findAllOfUser(+userId);
  }

}
