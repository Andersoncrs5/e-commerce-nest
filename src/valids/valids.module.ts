import { Module } from '@nestjs/common';
import { ValidsService } from './valids.service';
import { ValidsController } from './valids.controller';

@Module({
  controllers: [ValidsController],
  providers: [ValidsService],
  exports: [ValidsService]
})
export class ValidsModule {}
