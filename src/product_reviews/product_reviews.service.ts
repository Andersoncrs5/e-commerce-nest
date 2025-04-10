import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductReviewDto } from './dto/create-product_review.dto';
import { UpdateProductReviewDto } from './dto/update-product_review.dto';
import { Repository } from 'typeorm';
import { ProductReview } from './entities/product_review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@src/user/user.service';
import { ProductService } from '@src/product/product.service';
import { User } from '@src/user/entities/user.entity';
import { Product } from '@src/product/entities/product.entity';
import { ValidsService } from '@src/valids/valids.service';

@Injectable()
export class ProductReviewsService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly repository: Repository<ProductReview>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly valids: ValidsService,
  ) {

  }
  async create(userId:number, productId: string, createProductReviewDto: CreateProductReviewDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const user: User = await this.userService.findOne(userId);
      const product: Product = await this.productService.findOne(productId);
      
      const data = { ...createProductReviewDto, user, product }

      await queryRunner.manager.save(data);
      await queryRunner.commitTransaction();
    
      return 'review created';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllOfUser(userId:number, page: number, limit: number) {
    try {
      const user = await this.userService.findOne(userId);

      const [reviews, count] = await this.repository.findAndCount({
        where: {
          user
        },
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'ASC' }
      });

      return {
        data: reviews,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      };
    } catch(e) {
      throw new InternalServerErrorException();
    }
  }

  async findAllOfProduct(productId:string, page: number, limit: number) {
    try {
      const product = await this.productService.findOne(productId);

      const [reviews, count] = await this.repository.findAndCount({
        where: {
          product
        },
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'ASC' }
      });

      return {
        data: reviews,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      };
    } catch(e) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    this.valids.IsNotNullId(id);

    const review: ProductReview | null = await this.repository.findOne({ where : { id } });
    
    return this.valids.IsNotNullObject(review, 'review not found');
  }

}
