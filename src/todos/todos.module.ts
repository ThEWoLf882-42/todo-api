import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { RedisModule } from 'src/redis/redis.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [RedisModule, PrismaModule],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
