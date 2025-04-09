import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':productId/:userId')
  @HttpCode(HttpStatus.OK)
  async create(@Param('productId') productId: string, @Param('userId') userId: number) {
    return this.cartService.create(userId, productId);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  async findAllByUser(@Param('userId') userId: number) {
    return this.cartService.findAllByUser(userId);
  }

  @Get('/existsItemInCart/:productId/:userId')
  @HttpCode(HttpStatus.OK)
  async existsItemInCart(@Param('productId') productId: string, @Param('userId') userId: number) {
    return this.cartService.existsItemInCart(userId, productId);
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    return this.cartService.remove(id);
  }

}
