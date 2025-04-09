import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';
import { RolesGuard } from '@src/auth/Guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post(':productId/')
  @HttpCode(HttpStatus.OK)
  async create(@Param('productId') productId: string, @Req() req: any, order :CreateOrderDto) {
    return this.service.create(req.user.sub, productId, order );
  }

  @Get('/findAllByProduct/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  async findAllByProduct(@Param('id') id: string) {
    return this.service.findAllByProduct(id);
  }

  @Get('/findAllByUser')
  @HttpCode(HttpStatus.OK)
  async findAllByUser(@Req() req: any) {
    return this.service.findAllByUser(req.user.sub);
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
