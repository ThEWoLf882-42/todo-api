import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { PrismaService } from 'prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

describe('TodosService', () => {
  let service: TodosService;
  let prisma: PrismaService;
  let redis: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: PrismaService,
          useValue: {
            todo: {
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
            },
          },
        },
        {
          provide: RedisService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    prisma = module.get<PrismaService>(PrismaService);
    redis = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo and clear cache', async () => {
    const userId = '1';
    const dto = { title: 'New To-Do' };
    const mockTodo = {
      id: 'todo-id',
      title: dto.title,
      userId,
      completed: false,
    };

    jest.spyOn(prisma.todo, 'create').mockResolvedValue(mockTodo);

    const result = await service.create(userId, dto);
    expect(redis.del).toHaveBeenCalledWith(`user:${userId}:todo-stats`);
    expect(result).toEqual(mockTodo);
  });

  it('should find todos with pagination and filters', async () => {
    const userId = '1';
    const filter = { completed: false, search: 'task', page: 1, limit: 10 };
    const mockTodos = [{ id: '1', title: 'task 1', completed: false }];

    jest.spyOn(prisma.todo, 'findMany').mockResolvedValue(mockTodos);

    const result = await service.findAll(userId, filter);
    expect(result).toEqual(mockTodos);
  });

  it('should return cached stats if available', async () => {
    const userId = '1';
    const cachedStats = { total: 3, completed: 2, pending: 1 };

    jest.spyOn(redis, 'get').mockResolvedValue(JSON.stringify(cachedStats));

    const result = await service.stats(userId);
    expect(result).toEqual(cachedStats);
  });

  it('should calculate and cache stats if not cached', async () => {
    const userId = '1';

    jest.spyOn(redis, 'get').mockResolvedValue(null);
    jest
      .spyOn(prisma.todo, 'count')
      .mockResolvedValueOnce(5)
      .mockResolvedValueOnce(3);

    const result = await service.stats(userId);
    expect(redis.set).toHaveBeenCalled();
    expect(result).toEqual({ total: 5, completed: 3, pending: 2 });
  });

  it('should update a todo and clear cache', async () => {
    const updatedTodo = {
      id: '1',
      title: 'Updated Task',
      completed: true,
      userId: 'user1',
    };

    jest.spyOn(prisma.todo, 'update').mockResolvedValue(updatedTodo);

    const result = await service.update('1', {
      title: 'Updated Task',
      completed: true,
    });

    expect(redis.del).toHaveBeenCalledWith('user:user1:todo-stats');
    expect(result).toEqual(updatedTodo);
  });

  it('should delete a todo and clear cache', async () => {
    const deletedTodo = {
      id: '1',
      title: 'Deleted Task',
      completed: false,
      userId: 'user1',
    };

    jest.spyOn(prisma.todo, 'delete').mockResolvedValue(deletedTodo);

    const result = await service.remove('1');
    expect(redis.del).toHaveBeenCalledWith('user:user1:todo-stats');
    expect(result).toEqual(deletedTodo);
  });
});
