import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateTodoDto) {
    return this.todosService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Req() req, @Query() filter: FilterTodoDto) {
    return this.todosService.findAll(req.user.userId, filter);
  }

  @Get('stats')
  stats(@Req() req) {
    return this.todosService.stats(req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
