import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '@src/auth/auth.module';
import { ValidsModule } from '@src/valids/valids.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, ValidsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
