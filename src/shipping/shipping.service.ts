import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { Repository } from 'typeorm';
import { Shipping, ShippingStatus } from './entities/shipping.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { OrdersService } from '@src/orders/orders.service';
import { AddressService } from '@src/address/address.service';
import { UserService } from '@src/user/user.service';
import { ValidsService } from '@src/valids/valids.service';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private readonly repository: Repository<Shipping>,
    private readonly orderService: OrdersService,
    private readonly addressService: AddressService,
    private readonly userService: UserService,
    private readonly  valids: ValidsService,
  ){}

  async create(orderId: number, userId: number, createShippingDto: CreateShippingDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const user = await this.userService.findOne(userId);
      const address = await this.addressService.findOne(userId);
      const order = await this.orderService.findOne(orderId);

      const data = { ...createShippingDto, address, order }

      const created = this.repository.create(data);

      await queryRunner.manager.save(created);
      await queryRunner.commitTransaction();
    
      return 'Shipping created';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(page: number, limit: number) {
    try {    
      const [shippings, count] = await this.repository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: {id : 'ASC' }
      });

      return {
        data: shippings,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string):  Promise<Shipping> {
    try {
      await this.valids.IsNotNullIdAndValidUUID(id, 'Id is required and should be a valid UUID');
    
      const ship: Shipping | null = await this.repository.findOne({ where: { id } });
  
      return await this.valids.IsNotNullObject(ship, 'Shipping not found');;;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(id: string, updateShippingDto: UpdateShippingDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      await this.findOne(id);

      await queryRunner.manager.update(Shipping, id, updateShippingDto);
      await queryRunner.commitTransaction();
    
      return 'Shipping updated';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const shipp = await this.findOne(id);

      if (shipp.status != ShippingStatus.COMPLETE) {
        throw new UnauthorizedException();
      }

      await queryRunner.manager.delete(Shipping, id);
      await queryRunner.commitTransaction();
    
      return 'Shipping deleted';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
