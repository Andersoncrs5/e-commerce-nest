import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, Query } from '@nestjs/common';
import { ProductReviewsService } from './product_reviews.service';
import { CreateProductReviewDto } from './dto/create-product_review.dto';
import { UpdateProductReviewDto } from './dto/update-product_review.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';


@Controller('product-reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Post('/:productId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async create(@Req() req: any, @Param('productId') productId: string, @Body() createProductReviewDto: CreateProductReviewDto) {
    return await this.productReviewsService.create(req.user.sub, productId, createProductReviewDto);
  }

  @Get('/findAllOfProduct/:productId')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Quantidade de itens por página (máximo 100)' })
  async findAllOfProduct(
    @Param('productId') productId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',

  ) {
    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.min(100, parseInt(limit));
    return await this.productReviewsService.findAllOfProduct(productId, pageNumber, limitNumber);
  }

  @Get('/findAllOfUser/')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Quantidade de itens por página (máximo 100)' })
  async findAllOfUser(
    @Req() req: any,
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.min(100, parseInt(limit));
    return await this.productReviewsService.findAllOfUser(req.user.sub, pageNumber, limitNumber);
  }

}
