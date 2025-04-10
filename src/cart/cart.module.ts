import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductModule } from '@src/product/product.module';
import { UserModule } from '@src/user/user.module';
import { ValidsModule } from '@src/valids/valids.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Cart]), ProductModule, UserModule, ValidsModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
