import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/Guards/jwt.auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:productId/')
  @HttpCode(HttpStatus.OK)
  async create(
    @Req() req: any,
    @Param('productId') productId: string, 
    @Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(req.user.sub, productId, createCommentDto);
  }

  @Get('/findAllOfUser')
  @HttpCode(HttpStatus.OK)
  async findAllOfUser(@Req() req: any,) {
    return await this.commentService.findAllOfUser(req.user.sub);
  }

  @Get('findAllOfProduct/:id')
  @HttpCode(HttpStatus.OK)
  async findAllOfProduct(@Param('id') id: string) {
    return await this.commentService.findAllOfProduct(id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.commentService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return await this.commentService.remove(id);
  }

  @Post('/createCommentOnComment/:id')
  @HttpCode(HttpStatus.OK)
  async createCommentOnComment(
    @Param('id') id: string, 
    @Req() req: any,
    @Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.createCommentOnComment(id, req.user.sub, createCommentDto);
  }
  
  @Get('/findCommentsOnComment/:id')
  @HttpCode(HttpStatus.OK)
  async findCommentsOnComment(@Param('id') id: string) {
    return await this.commentService.findCommentsOnComment(id);
  }
  
}