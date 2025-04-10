import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserModule } from 'src/user/user.module';
import { ValidsModule } from '@src/valids/valids.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), UserModule, ValidsModule],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService]
})
export class AddressModule {}
