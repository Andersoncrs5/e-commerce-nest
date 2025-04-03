import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { ProductModule } from '@src/product/product.module';
import { UserModule } from '@src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, ProductModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports : [CommentModule]
})
export class CommentModule {}
