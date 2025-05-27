import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'dark-mode',
    description: 'User UI preference or settings key',
  })
  @IsOptional()
  @IsString()
  preferences?: string;
}
