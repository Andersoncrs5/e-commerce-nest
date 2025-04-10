import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UserModule } from 'src/user/user.module';
import { ValidsModule } from '@src/valids/valids.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UserModule, ValidsModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
