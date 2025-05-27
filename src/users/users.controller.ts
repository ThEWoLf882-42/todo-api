import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findId(id);
  }
}
