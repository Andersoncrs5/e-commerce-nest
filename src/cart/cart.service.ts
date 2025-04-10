import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@src/user/user.service';
import { ProductService } from '@src/product/product.service';
import { User } from '@src/user/entities/user.entity';
import { Product } from '@src/product/entities/product.entity';
import { ValidsService } from '@src/valids/valids.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly repository: Repository<Cart>,
    private readonly valids: ValidsService,
    private readonly userService: UserService,
    private readonly producrService: ProductService

  ){}

  async existsItemInCart(userId: number, productId: string): Promise<boolean> {
    try {
      const user: User = await this.userService.findOne(userId);
      const product: Product = await this.producrService.findOne(productId);

      const check = this.repository.exists({
        where: {
          user,
          product
        }
      });

      return check;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async create(userId: number, productId: string): Promise<string> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const user: User = await this.userService.findOne(userId);
      const product: Product = await this.producrService.findOne(productId);

      const data = {
        user,
        product
      }

      const save = await queryRunner.manager.create(Cart, data);
      
      await queryRunner.manager.save(save);
      await queryRunner.commitTransaction();
    
      return 'Product added in cart';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllByUser(userId: number,page: number, limit: number) {
    try {
      const user: User = await this.userService.findOne(userId);
    
      const [result, count] = await this.repository.findAndCount({
        where: {
          user,
        },
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'ASC' }
      });

      return {
        data: result,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: number) {
    try {
      this.valids.IsNotNullId(id);

      const result = await this.repository.findOne({
        where: {
          id
        }
      })

      return this.valids.IsNotNullObject(result, 'Product not found');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const check = await this.findOne(id);

      await queryRunner.manager.delete(Cart, check);
      await queryRunner.commitTransaction();
    
      return 'Product deleted!!!';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
  
}
