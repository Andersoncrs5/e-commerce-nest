import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidsModule } from '@src/valids/valids.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, ProductModule, ValidsModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports : [CommentModule]
})
export class CommentModule {}
