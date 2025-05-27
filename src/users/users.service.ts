import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  async findEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findId(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
