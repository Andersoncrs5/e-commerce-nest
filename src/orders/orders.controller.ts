import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post(':productId/:userId')
  async create(@Param('productId') productId: string, @Param('userId') userId: number, order :CreateOrderDto) {
    return this.service.create(userId, productId, order );
  }

  @Get('/findAllByProduct/:id')
  async findAllByProduct(@Param('id') id: string) {
    return this.service.findAllByProduct(id);
  }

  @Get('/findAllByUser/:id')
  async findAllByUser(@Param('id') id: number) {
    return this.service.findAllByUser(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.service.update(+id, updateOrderDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.service.remove(id);
  }

}
