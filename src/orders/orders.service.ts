import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, SaleStatus, ShippingStatus } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserService } from '@src/user/user.service';
import { ProductService } from '@src/product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/user/entities/user.entity';
import { Product } from '@src/product/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userService: UserService,
    private readonly producrService: ProductService
  ){}

  async create(userId:number, productId: string, createOrderDto: CreateOrderDto): Promise<string> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const user: User = await this.userService.findOne(userId);
      const product: Product = await this.producrService.findOne(productId);

      product.quantity -= createOrderDto.quantity
      await this.productRepository.save(product);

      const data = { ...createOrderDto, user, product }

      await queryRunner.manager.save(data);
      await queryRunner.commitTransaction();
    
      return 'Order added';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllByUser(userId: number): Promise<Order[]> {
    try {
      const user: User = await this.userService.findOne(userId);

      const result = await this.repository.find({
        where: {
          user
        }
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllByProduct(productId: string): Promise<Order[]> {
    try {
      const product: Product = await this.producrService.findOne(productId);

      const result = await this.repository.find({
        where: {
          product
        }
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Order> {
    try {
      if (!id || isNaN(id) || id <= 0) {
        throw new BadRequestException('ID must be a positive number');
      }

      const result: Order | null = await this.repository.findOne({
        where: {
          id
        }
      });

      if (result == null) {
        throw new NotFoundException('Order not found');
      }

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const order: Order = await this.findOne(id);

      if (order.sale_status != SaleStatus.WAITING_RESPONSE ) {
        throw new UnauthorizedException('')
      }

      await queryRunner.manager.update(Order, id, updateOrderDto);
      await queryRunner.commitTransaction();
    
      return 'Order added';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const order: Order = await this.findOne(id);

      if (order.sale_status != SaleStatus.PAYMENT_COMPLETED && 
          order.shipping_status !=  ShippingStatus.COMPLETE) {
        throw new UnauthorizedException('')
      }

      await queryRunner.manager.delete(Order, id);
      await queryRunner.commitTransaction();
    
      return 'Order delete';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

}
