import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDiscountCouponDto } from './dto/create-discount_coupon.dto';
import { UpdateDiscountCouponDto } from './dto/update-discount_coupon.dto';
import { Repository } from 'typeorm';
import { DiscountCoupon } from './entities/discount_coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiscountCouponsService {
  constructor(
    @InjectRepository(DiscountCoupon)
    private readonly repository: Repository<DiscountCoupon>
  ){}

  async create(createDiscountCouponDto: CreateDiscountCouponDto): Promise<string> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {

      const data = { ...createDiscountCouponDto }
      const created = this.repository.create(data);

      await queryRunner.manager.save(created);
      await queryRunner.commitTransaction();
    
      return 'Coupon created';
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.code === '23505') {
        throw new BadRequestException('code already used');
      }

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(page: number, limit: number) {
    try {
      const [result, count] = await this.repository.
      findAndCount({
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      if (!id || isNaN(id) || id <= 0) {
        throw new BadRequestException('ID must be a positive number');
      }

      const Coupon: DiscountCoupon | null = await this.repository.findOne({ where : { id } });

      if (Coupon == null) {
        throw new NotFoundException('Coupon not found');
      }

      return Coupon;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateDiscountCouponDto: UpdateDiscountCouponDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      await this.findOne(id);

      await queryRunner.manager.update(DiscountCoupon, id, updateDiscountCouponDto);
      await queryRunner.commitTransaction();
    
      return 'Coupon updated';
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
      await this.findOne(id);

      await queryRunner.manager.delete(DiscountCoupon, id);
      await queryRunner.commitTransaction();
    
      return 'Coupon deleted';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async checkActivedCoupon(id: number): Promise<boolean> {
    try {
      
      const result = await this.findOne(id);

      return result ? true : false;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}