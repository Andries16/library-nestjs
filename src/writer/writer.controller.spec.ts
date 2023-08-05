import { Test, TestingModule } from '@nestjs/testing';
import { WriterController } from './writer.controller';

describe('WriterController', () => {
  let controller: WriterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WriterController],
    }).compile();

    controller = module.get<WriterController>(WriterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
