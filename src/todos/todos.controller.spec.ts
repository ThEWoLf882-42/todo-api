import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            stats: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a todo', async () => {
    const userId = 'user1';
    const dto: CreateTodoDto = { title: 'New Task' };
    const expected = { id: '1', title: dto.title, completed: false };

    jest.spyOn(service, 'create').mockResolvedValue(expected);

    const result = await controller.create({ user: { userId } } as any, dto);
    expect(result).toEqual(expected);
  });

  it('should return todos with filters', async () => {
    const userId = 'user1';
    const filter: FilterTodoDto = { completed: false };
    const mockTodos = [{ id: '1', title: 'Task', completed: false }];

    jest.spyOn(service, 'findAll').mockResolvedValue(mockTodos);

    const result = await controller.findAll(
      { user: { userId } } as any,
      filter,
    );
    expect(result).toEqual(mockTodos);
  });

  it('should return stats', async () => {
    const userId = 'user1';
    const stats = { total: 10, completed: 5, pending: 5 };

    jest.spyOn(service, 'stats').mockResolvedValue(stats);

    const result = await controller.stats({ user: { userId } } as any);
    expect(result).toEqual(stats);
  });

  it('should update a todo', async () => {
    const dto: UpdateTodoDto = { title: 'Update', completed: true };
    const updated = { id: '1', title: dto.title, completed: true };

    jest.spyOn(service, 'update').mockResolvedValue(updated);

    const result = await controller.update('1', dto);
    expect(result).toEqual(updated);
  });

  it('should delete a todo', async () => {
    const deleted = { id: '1', title: 'Old', completed: false };

    jest.spyOn(service, 'remove').mockResolvedValue(deleted);

    const result = await controller.remove('1');
    expect(result).toEqual(deleted);
  });
});
