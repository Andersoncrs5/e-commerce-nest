import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, Req } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Req() req: any, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(req.user.sub, createAddressDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findOne(@Req() req: any) {
    return await this.addressService.findOne(req.user.sub);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(@Req() req: any, @Body() updateAddressDto: UpdateAddressDto) {
    return await this.addressService.update(req.user.sub, updateAddressDto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async remove(@Req() req: any) {
    return await this.addressService.remove(req.user.sub);
  }
}
