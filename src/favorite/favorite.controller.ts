import { Controller, Get, Param } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get('save/:userId/:productId')
  async save(@Param('userId') userId: number, @Param('productId') productId: string ){
    return await this.favoriteService.save(userId, productId);
  }

  @Get('check/:userId/:productId')
  async check(@Param('userId') userId: number, @Param('productId') productId: string ){
    return await this.favoriteService.check(userId, productId);
  }

  @Get('remove/:userId/:productId')
  async remove(@Param('userId') userId: number, @Param('productId') productId: string ){
    return await this.favoriteService.remove(userId, productId);
  }

  @Get('findAllByUser/:userId')
  async findAllByUser(@Param('userId') userId: number){
    return await this.favoriteService.findAllByUser(userId);
  }
  
}