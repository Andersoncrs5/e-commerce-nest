import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { UserModule } from '@src/user/user.module';
import { ValidsModule } from '@src/valids/valids.module';

@Module({
  imports: [TypeOrmModule.forFeature([Log]), UserModule, ValidsModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
