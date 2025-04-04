import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IsNull, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { isUUID } from 'class-validator';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly productService: ProductService
  ) {}

  async create(userId: number, productId: string, createCommentDto: CreateCommentDto): Promise<Comment> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const product = await this.productService.findOne(productId);
      const user = await this.userService.findOne(userId);

      const data = this.repository.create({
        ...createCommentDto,
        user,
        product,
      });

      const saved = await queryRunner.manager.save(Comment, data);
      await queryRunner.commitTransaction();

      return saved;
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

      return await this.repository.find({
        where: {
          user,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAllOfProduct(id: string): Promise<Comment[]> {
    try {
      const product = await this.productService.findOne(id);

      return await this.repository.find({
        where: {
          product,
          parent: IsNull(),
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string): Promise<Comment> {
    try {
      if (!id || !isUUID(id)) {
        throw new BadRequestException('Id is required and should be a valid UUID');
      }

      const comment = await this.repository.findOne({ where: { id } });

      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      return comment;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const comment = await this.findOne(id);

      updateCommentDto.is_edited = true;

      await queryRunner.manager.update(Comment, id, updateCommentDto);

      await queryRunner.commitTransaction();

      return { ...comment, ...updateCommentDto } as Comment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<string> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await this.findOne(id);

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

  async createCommentOnComment(id: string, userId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const parentComment = await this.findOne(id);
      const user = await this.userService.findOne(userId);

      const data = this.repository.create({
        ...createCommentDto,
        user,
        product: parentComment.product,
        parent: parentComment,
      });

      const saved = await queryRunner.manager.save(Comment, data);
      await queryRunner.commitTransaction();

      return saved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findCommentsOnComment(commentId: string): Promise<Comment[]> {
    try {
      const comment = await this.repository.findOne({
        where: { id: commentId },
        relations: ['replies'],
      });

      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      return comment.replies;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}