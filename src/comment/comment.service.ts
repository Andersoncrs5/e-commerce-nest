import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IsNull, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@src/user/user.service';
import { ProductService } from '@src/product/product.service';
import { isUUID } from 'class-validator';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly productService: ProductService
  ){}

  async create(userId: number, productId: string, createCommentDto: CreateCommentDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const product = await this.productService.findOne(productId);
      const user = await this.userService.findOne(userId);

      const data = { ...createCommentDto, user, product }

      await queryRunner.manager.save(Comment, data);
      await queryRunner.commitTransaction();
    
      return 'Product deleted';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllOfUser(id: number): Promise<Comment[]> {
    try {
      const user = await this.userService.findOne(id);

      const comment: Comment[] = await this.repository.find({
        where : {
          user
        }
      });

      return comment;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAllOfProduct(id: string): Promise<Comment[]> {
    try {
      const product = await this.productService.findOne(id);
  
      const comments: Comment[] = await this.repository.find({
        where: {
          product,
          parent: IsNull(),
        },
      });
  
      return comments;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string): Promise<Comment> {
    try {
      if (!id || !isUUID(id)) {
        throw new BadRequestException('Id is required and should be a valid UUID');
      }

      const comment: Comment | null = await this.repository.findOne({
        where : {
          id
        }
      });

      if (comment == null) {
        throw new NotFoundException('Comment not found');
      }

      return comment;

    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const comment = await this.findOne(id);

      updateCommentDto.is_edited = true;

      await queryRunner.manager.update(Comment, id, updateCommentDto);
      await queryRunner.commitTransaction();
    
      return 'Product deleted';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const comment = await this.findOne(id);

      await queryRunner.manager.delete(Comment, id);
      await queryRunner.commitTransaction();
    
      return 'Comment deleted';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async createCommentOnComment(id: string, userId: number, createCommentDto: CreateCommentDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const comment = await this.findOne(id);
      const user = await this.userService.findOne(userId);

      const data = { 
        ...createCommentDto, 
        user , 
        product: comment.product , 
        parent: comment 
      }

      await queryRunner.manager.save(Comment, data);
      await queryRunner.commitTransaction();
    
      return 'Comment created';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findCommentsOnComment(commentId: string) {
    try {
        const comment = await this.repository.findOne({
            where: { id: commentId },
            relations: ['replies'],
        });

        if (!comment) {
            throw new NotFoundException("Comment not found");
        }

        return comment.replies;
    } catch (e) {
        throw new InternalServerErrorException(e);
    }
  }

}