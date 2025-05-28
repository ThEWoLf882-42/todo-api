import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'A modern, secure, and modular API built with NestJS, Prisma, and Redis. It includes user registration, authentication with JWT access and refresh tokens, rate limiting, and Todo management.';
  }
}
