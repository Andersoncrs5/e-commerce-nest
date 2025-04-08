import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Log]), UserModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
