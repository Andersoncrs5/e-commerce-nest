import { Controller, Get, HttpCode, HttpStatus, Param, Query, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Quantidade de itens por página (máximo 100)' })
  async findAllByUser(
    @Req() req: any,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.min(100, parseInt(limit));

    return await this.favoriteService.findAllByUser(req.user.sub, pageNumber, limitNumber);
  }
  
}