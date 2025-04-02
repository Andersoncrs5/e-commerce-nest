import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UUID } from 'crypto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(':userId')
  async create(@Param('userId') userId: number, @Body() createProductDto: CreateProductDto) {
    return await this.productService.create(userId, createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }

  @Get('changeStatus/:id')
  async changeStatus(@Param('id') id: string) {
    return await this.productService.changeStatus(id);
  }
  
}
