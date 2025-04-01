import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly userService: UserService
  ){}

  async create(userId:number, createCategoryDto: CreateCategoryDto): Promise<string> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const user: User = await this.userService.findOne(userId);

      const data = { ...createCategoryDto, user }
      
      await queryRunner.manager.save(Category, data);
      await queryRunner.commitTransaction();
    
      return 'Category created with success!';
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error.code === '23505') {
        throw new BadRequestException('Name of category already used');
      }

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.repository.find({ where : { is_active: true } });
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      if (!id || isNaN(id) || id <= 0) {
        throw new BadRequestException('ID must be a positive number');
      }

      const Category: Category | null = await this.repository.findOne({ where : { id } });

      if (Category == null) {
        throw new NotFoundException('Category not found');
      }

      return Category;
    } catch (e) {
      throw new InternalServerErrorException(e)
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const category: Category = await this.findOne(id);

      await queryRunner.manager.update(Category, id, updateCategoryDto);
      await queryRunner.commitTransaction();
    
      return await this.findOne(id);
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
      const category: Category = await this.findOne(id);

      await queryRunner.manager.delete(Category, id);
      await queryRunner.commitTransaction();
    
      return 'Category deleted with success!';
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async changeStatus(id: number): Promise<string> {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    
    try {
      const category: Category = await this.findOne(id);

      category.is_active = !category.is_active;

      await queryRunner.manager.update(Category, id, category);
      await queryRunner.commitTransaction();
    
      return 'Status change!!';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

}
