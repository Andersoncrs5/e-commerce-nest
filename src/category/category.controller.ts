import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(':userId')
  @ApiBody({ type: CreateCategoryDto })
  async create(@Param('userId') userId: string ,@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(+userId, createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(+id);
  }

  @Get('changeStatus/:id')
  async changeStatus(@Param('id') id: string) {
    return await this.categoryService.changeStatus(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCategoryDto })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(+id);
  }
}
