import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly repository: Repository<Address>,
    private readonly userService: UserService
  ){}

  async create(userId: number,  createAddressDto: CreateAddressDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const user: User = await this.userService.findOne(userId);
      
      const data = { ...createAddressDto, user }

      await queryRunner.manager.save(Address ,data);
      await queryRunner.commitTransaction();
    
      return 'Address created';
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.code === '23505') {
        throw new BadRequestException('Address already used');
      }

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: number): Promise<Address> {
    try {
      if (!id || isNaN(id) || id <= 0) {
        throw new BadRequestException('ID must be a positive number');
      }

      const user = await this.userService.findOne(id);

      const address = await this.repository.findOne({ where: { user: { id: id } } });

      if (address == null) {
        throw new NotFoundException('Addres not found');
      }

      return address;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(userId: number, updateAddressDto: UpdateAddressDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const address: Address = await this.findOne(userId);

      await queryRunner.manager.update(Address, { user: { id: userId } }, updateAddressDto);
      await queryRunner.commitTransaction();
    
      return 'Address updated';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(userId: number) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const user: User = await this.userService.findOne(userId);
      
      const address = await this.findOne(userId);

      await queryRunner.manager.delete(Address, address.id);
      await queryRunner.commitTransaction();
    
      return 'Address deleted!!!';
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.code === '23505') {
        throw new BadRequestException('Address already used');
      }

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
