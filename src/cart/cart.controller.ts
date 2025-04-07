import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':productId/:userId')
  async create(@Param('productId') productId: string, @Param('userId') userId: number) {
    return this.cartService.create(userId, productId);
  }

  @Get(':userId')
  async findAllByUser(@Param('userId') userId: number) {
    return this.cartService.findAllByUser(userId);
  }

  @Get('/existsItemInCart/:productId/:userId')
  async existsItemInCart(@Param('productId') productId: string, @Param('userId') userId: number) {
    return this.cartService.existsItemInCart(userId, productId);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.cartService.remove(id);
  }

}
