import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@src/user/user.service';
import { User } from '@src/user/entities/user.entity';
import { ValidsService } from '@src/valids/valids.service';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly repository: Repository<Log>,
    private readonly valids: ValidsService,
    private readonly userService: UserService
  ){}

  async create(userId: number, createLogDto: CreateLogDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const user: User = await this.userService.findOne(userId);
      
      const data = { ...createLogDto, user }

      await queryRunner.manager.save(data);
      await queryRunner.commitTransaction();
    
      return 'log created';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const logs: Log[] = await this.repository.find();

      return logs;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Log> {
    try {
      this.valids.IsNotNullId(id);

      const log : Log | null = await this.repository.findOne({ where:{ id } });

      return this.valids.IsNotNullObject(log, 'Log not found');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      await this.findOne(id);

      await queryRunner.manager.delete(Log, id);
      await queryRunner.commitTransaction();
    
      return 'log deleted';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
