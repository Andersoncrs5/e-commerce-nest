import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { omit } from 'lodash';
import { CategoryService } from '../category/category.service';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService
  ){}

  async create(userId: number, createProductDto: CreateProductDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const user: User = await this.userService.findOne(userId);
      const category: Category = await this.categoryService.findOne(createProductDto.category_id);

      const { category_id, ...struct } = createProductDto;
      const data = this.repository.create({ ...struct, user, category });

      await queryRunner.manager.save(data);
      await queryRunner.commitTransaction();
    
      return 'Product created';
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.code === '23505') {
        throw new BadRequestException('Unique code already used');
      }

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(page: number, limit: number) {
    try {
      const [products, count] = await this.repository.
      findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'ASC' }
      });
  
      return {
        data: products,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message || error);
    }
  }
  

  async findOne(id: string): Promise<Product> {
    try {
      if (!id || !isUUID(id)) {
        throw new BadRequestException('Id is required and should be a valid UUID');
      }
    
      const product = await this.repository.findOne({ where: { id } });
    
      if (!product) {
        throw new NotFoundException('Product not found');
      }
    
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const product = await this.findOne(id);

      const { category_id, ...data } = updateProductDto;

      await queryRunner.manager.update(Product, id, data);
      await queryRunner.commitTransaction();
    
      return 'Product created';
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.code === '23505') {
        throw new BadRequestException('Unique code already used');
      }

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const product: Product = await this.findOne(id);

      await queryRunner.manager.delete(Product, id);
      await queryRunner.commitTransaction();
    
      return 'Product deleted';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async changeStatus(id: string) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const product = await this.findOne(id);

      product.is_active = !product.is_active;

      await queryRunner.manager.update(Product, id, product);
      await queryRunner.commitTransaction();
    
      return 'Status chenged!!!';
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

}
