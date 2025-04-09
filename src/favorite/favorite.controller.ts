import { Controller, Get, HttpCode, HttpStatus, Param, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get('/save/:productId')
  @HttpCode(HttpStatus.OK)
  async save(@Req() req: any, @Param('productId') productId: string ){
    return await this.favoriteService.save(req.user.sub, productId);
  }

  @Get('/check/:productId')
  @HttpCode(HttpStatus.OK)
  async check(@Req() req: any, @Param('productId') productId: string ){
    return await this.favoriteService.check(req.user.sub, productId);
  }

  @Get('/remove/:productId')
  @HttpCode(HttpStatus.OK)
  async remove(@Req() req: any, @Param('productId') productId: string ){
    return await this.favoriteService.remove(req.user.sub, productId);
  }

  @Get('/findAllByUser')
  @HttpCode(HttpStatus.OK)
  async findAllByUser(@Req() req: any){
    return await this.favoriteService.findAllByUser(req.user.sub);
  }
  
}