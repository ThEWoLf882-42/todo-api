import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'Title of the todo item',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
