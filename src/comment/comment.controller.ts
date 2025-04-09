import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:productId/:userId')
  @HttpCode(HttpStatus.OK)
  async create(
    @Param('userId') userId: number, 
    @Param('productId') productId: string, 
    @Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(userId, productId, createCommentDto);
  }

  @Get('findAllOfUser/:id')
  @HttpCode(HttpStatus.OK)
  async findAllOfUser(@Param('id') id: number) {
    return await this.commentService.findAllOfUser(id);
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

  @Post('/createCommentOnComment/:id/:userId')
  @HttpCode(HttpStatus.OK)
  async createCommentOnComment(
    @Param('id') id: string, 
    @Param('userId') userId: number, 
    @Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.createCommentOnComment(id, userId, createCommentDto);
  }
  
  @Get('/findCommentsOnComment/:id')
  @HttpCode(HttpStatus.OK)
  async findCommentsOnComment(@Param('id') id: string) {
    return await this.commentService.findCommentsOnComment(id);
  }
  
}
