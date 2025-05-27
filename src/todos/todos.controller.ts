import {
  Body,
  Controller,
  Delete,
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
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Todos')
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'Todo created successfully' })
  create(@Req() req, @Body() dto: CreateTodoDto) {
    return this.todosService.create(req.user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get todos with optional filters' })
  findAll(@Req() req, @Query() filter: FilterTodoDto) {
    return this.todosService.findAll(req.user.userId, filter);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get todo statistics' })
  stats(@Req() req) {
    return this.todosService.stats(req.user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todosService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
