import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get('save/:userId/:productId')
  @HttpCode(HttpStatus.OK)
  async save(@Param('userId') userId: number, @Param('productId') productId: string ){
    return await this.favoriteService.save(userId, productId);
  }

  @Get('check/:userId/:productId')
  @HttpCode(HttpStatus.OK)
  async check(@Param('userId') userId: number, @Param('productId') productId: string ){
    return await this.favoriteService.check(userId, productId);
  }

  @Get('remove/:userId/:productId')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('userId') userId: number, @Param('productId') productId: string ){
    return await this.favoriteService.remove(userId, productId);
  }

  @Get('findAllByUser/:userId')
  @HttpCode(HttpStatus.OK)
  async findAllByUser(@Param('userId') userId: number){
    return await this.favoriteService.findAllByUser(userId);
  }
  
}