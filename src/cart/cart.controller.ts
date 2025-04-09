import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/:productId')
  @HttpCode(HttpStatus.OK)
  async create(@Param('productId') productId: string, @Req() req: any) {
    return this.cartService.create(req.user.id, productId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllByUser(@Req() req: any) {
    return this.cartService.findAllByUser(req.user.id);
  }

  @Get('/existsItemInCart/:productId/')
  @HttpCode(HttpStatus.OK)
  async existsItemInCart(@Param('productId') productId: string, @Req() req: any) {
    return this.cartService.existsItemInCart(req.user.id, productId);
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    return this.cartService.remove(id);
  }

}
