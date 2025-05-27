import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        title: dto.title,
        userId,
      },
    });
  }

  async findAll(userId: string, filter: FilterTodoDto) {
    const { completed, search, page = 1, limit = 10 } = filter;

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
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async stats(userId: string) {
    const total = await this.prisma.todo.count({ where: { userId } });
    const completed = await this.prisma.todo.count({
      where: { userId, completed: true },
    });

    return { total, completed, pending: total - completed };
  }

  async update(id: string, dto: UpdateTodoDto) {
    return this.prisma.todo.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
