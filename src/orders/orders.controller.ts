import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Quantidade de itens por página (máximo 100)' })
  async findAllByProduct(
    @Param('id') id: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.min(100, parseInt(limit));

    return this.service.findAllByProduct(id, pageNumber, limitNumber);
  }

  @Get('/findAllByUser')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Quantidade de itens por página (máximo 100)' })
  async findAllByUser(
    @Req() req: any,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {

    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.min(100, parseInt(limit));

    return this.service.findAllByUser(req.user.sub, pageNumber, limitNumber);
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
