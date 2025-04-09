import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post(':productId/:userId')
  @HttpCode(HttpStatus.OK)
  async create(@Param('productId') productId: string, @Param('userId') userId: number, order :CreateOrderDto) {
    return this.service.create(userId, productId, order );
  }

  @Get('/findAllByProduct/:id')
  @HttpCode(HttpStatus.OK)
  async findAllByProduct(@Param('id') id: string) {
    return this.service.findAllByProduct(id);
  }

  @Get('/findAllByUser/:id')
  @HttpCode(HttpStatus.OK)
  async findAllByUser(@Param('id') id: number) {
    return this.service.findAllByUser(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.service.update(+id, updateOrderDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    return this.service.remove(id);
  }

}
