import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UseGuards, Query } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';
import { RolesGuard } from '@src/auth/Guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('/:orderId')
  @ApiBody({ type: CreateShippingDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  async create(
    @Body() createShippingDto: CreateShippingDto,
    @Param('orderId') orderId: string,
    @Req() req : any
  ) {
    return await this.shippingService.create(+orderId, req.user.sub,createShippingDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Quantidade de itens por página (máximo 100)' })
  async findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.min(100, parseInt(limit));

    return await this.shippingService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.shippingService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateShippingDto })
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() updateShippingDto: UpdateShippingDto) {
    return await this.shippingService.update(id, updateShippingDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string) {
    return await this.shippingService.remove(id);
  }
}
