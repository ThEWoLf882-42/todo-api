import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { RedisService } from 'src/redis/redis.service';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class TodosService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async create(userId: string, dto: CreateTodoDto) {
    const cleanTitle = sanitizeHtml(dto.title);
    const todo = await this.prisma.todo.create({
      data: {
        title: dto.title,
        userId,
      },
    });

    await this.redis.del(`user:${userId}:todo-stats`);
    return todo;
  }

  async findAll(userId: string, filter: FilterTodoDto) {
    const { completed, search, page = 1, limit = 10 } = filter;

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    return this.prisma.todo.findMany({
      where: {
        userId,
        ...(completed !== undefined && { completed }),
        ...(search && {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async stats(userId: string) {
    const cacheKey = `user:${userId}:todo-stats`;
    const cached = await this.redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const total = await this.prisma.todo.count({ where: { userId } });
    const completed = await this.prisma.todo.count({
      where: { userId, completed: true },
    });

    const result = { total, completed, pending: total - completed };

    await this.redis.set(cacheKey, result, 30);
    return result;
  }

  async update(id: string, dto: UpdateTodoDto) {
    const todo = await this.prisma.todo.update({ where: { id }, data: dto });
    await this.redis.del(`user:${todo.userId}:todo-stats`);
    return todo;
  }

  async remove(id: string) {
    const todo = await this.prisma.todo.delete({ where: { id } });
    await this.redis.del(`user:${todo.userId}:todo-stats`);
    return todo;
  }
}
