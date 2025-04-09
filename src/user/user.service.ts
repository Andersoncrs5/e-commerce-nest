import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from '../../CryptoService';
import { AuthService } from '@src/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly authService: AuthService
  ){}

  async create(createUserDto: CreateUserDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const data: User = await queryRunner.manager.create(User, createUserDto);
      
      await queryRunner.manager.save(data);
      await queryRunner.commitTransaction();
    
      const user = await this.findUserByEmail(createUserDto.email);

      return this.authService.token(user);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.code === '23505') {
        throw new BadRequestException('Email already used');
      }

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDto: LoginUserDto) {
    try {
      const user = await this.findUserByEmail(loginDto.email);

      if (!CryptoService.compare(loginDto.password, user.password)) {
        throw new UnauthorizedException();
      }

      return this.authService.token(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findUserByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('email is required');
    }

    email = email.trim();

    const user: User | null = await this.repository.findOne({ where : { email } });

    if (user == null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOne(id: number) {
    if (!id || isNaN(id) || id <= 0) {
      throw new BadRequestException('ID must be a positive number');
    }

    const user: User | null = await this.repository.findOne({ where : { id } });

    if (user == null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | NotFoundException | null> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const check = await this.findOne(id);

      if(!updateUserDto.password){
        throw new BadRequestException('Password is required')
      }

      updateUserDto.password = await CryptoService.encrypt(updateUserDto.password);
      await queryRunner.manager.update(User, id, updateUserDto);
      await queryRunner.commitTransaction();

      const userUpdated: User | null = await queryRunner.manager.findOne(User, { where: { id }});

      return userUpdated;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<string> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const check = await this.findOne(id);

      await queryRunner.manager.delete(User, id);
      await queryRunner.commitTransaction();

      return 'User deleted with id : ' + id;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
