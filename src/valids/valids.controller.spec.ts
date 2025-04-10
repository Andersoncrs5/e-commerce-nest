import { Test, TestingModule } from '@nestjs/testing';
import { ValidsController } from './valids.controller';
import { ValidsService } from './valids.service';

describe('ValidsController', () => {
  let controller: ValidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidsController],
      providers: [ValidsService],
    }).compile();

    controller = module.get<ValidsController>(ValidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
