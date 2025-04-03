import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:productId/:userId')
  async create(
    @Param('userId') userId: number, 
    @Param('productId') productId: string, 
    @Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(userId, productId, createCommentDto);
  }

  @Get('findAllOfUser/:id')
  async findAllOfUser(@Param('id') id: number) {
    return await this.commentService.findAllOfUser(id);
  }

  @Get('findAllOfProduct/:id')
  async findAllOfProduct(@Param('id') id: string) {
    return await this.commentService.findAllOfProduct(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }

  @Post('/createCommentOnComment/:id/:userId')
  async createCommentOnComment(
    @Param('id') id: string, 
    @Param('userId') userId: number, 
    @Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.createCommentOnComment(id, userId, createCommentDto);
  }
  
  @Get('/findCommentsOnComment/:id')
  async findCommentsOnComment(@Param('id') id: string) {
    return await this.commentService.findCommentsOnComment(id);
  }
  
}
