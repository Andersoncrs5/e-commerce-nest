import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { LogModule } from './log/log.module';
import { ProductReviewsModule } from './product_reviews/product_reviews.module';
import { DiscountCouponsModule } from './discount_coupons/discount_coupons.module';
import { ShippingModule } from './shipping/shipping.module';
import { ValidsModule } from './valids/valids.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    UserModule,
    AddressModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    CommentModule,
    FavoriteModule,
    CartModule,
    OrdersModule,
    LogModule,
    ProductReviewsModule,
    DiscountCouponsModule,
    ShippingModule,
    ValidsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
