import { Controller } from '@nestjs/common';
import { ValidsService } from './valids.service';

@Controller('valids')
export class ValidsController {
  constructor(private readonly validsService: ValidsService) {}
}
