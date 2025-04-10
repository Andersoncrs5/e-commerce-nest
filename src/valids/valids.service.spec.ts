import { Test, TestingModule } from '@nestjs/testing';
import { ValidsService } from './valids.service';

describe('ValidsService', () => {
  let service: ValidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidsService],
    }).compile();

    service = module.get<ValidsService>(ValidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
