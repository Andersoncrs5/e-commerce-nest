import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
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
  async findAll() {
    return await this.shippingService.findAll();
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
