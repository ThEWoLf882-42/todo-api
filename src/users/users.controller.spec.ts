import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findId: jest
              .fn()
              .mockResolvedValue({ id: '123', email: 'test@test.com' }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user by ID', async () => {
    const user = await controller.getUser('123');
    expect(user).toEqual({ id: '123', email: 'test@test.com' });
    expect(service.findId).toHaveBeenCalledWith('123');
  });
});
