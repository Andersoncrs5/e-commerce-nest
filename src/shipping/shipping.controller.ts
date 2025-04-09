import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('/:orderId/:userId')
  async create(
    @Body() createShippingDto: CreateShippingDto,
    @Param('orderId') orderId: string,
    @Param('userId') userId: string
  ) {
    return await this.shippingService.create(+orderId, +userId,createShippingDto);
  }

  @Get()
  async findAll() {
    return await this.shippingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shippingService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShippingDto: UpdateShippingDto) {
    return await this.shippingService.update(id, updateShippingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shippingService.remove(id);
  }
}
