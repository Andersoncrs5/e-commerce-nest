import { Module } from '@nestjs/common';
import { ProductReviewsService } from './product_reviews.service';
import { ProductReviewsController } from './product_reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview } from './entities/product_review.entity';
import { UserModule } from '@src/user/user.module';
import { ProductModule } from '@src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReview]), UserModule, ProductModule],
  controllers: [ProductReviewsController],
  providers: [ProductReviewsService],
})
export class ProductReviewsModule {}
