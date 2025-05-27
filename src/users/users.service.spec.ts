import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'prisma/prisma.service';
import bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user with hashed password', async () => {
    const dto = { email: 'test@test.com', password: 'test123' };
    const hashed = await bcrypt.hash(dto.password, 10);

    jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue(hashed);
    jest.spyOn(prisma.user, 'create').mockResolvedValue({
      id: 'user-id',
      email: dto.email,
      password: hashed,
      createdAt: new Date(),
    });

    const result = await service.create(dto);
    expect(result.password).toBe(hashed);
    expect(result.email).toBe(dto.email);
  });

  it('should find user by email', async () => {
    const mockUser = { id: '1', email: 'test@test.com', password: 'test123' };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await service.findEmail('test@test.com');
    expect(result).toEqual(mockUser);
  });

  it('should find user by id', async () => {
    const mockUser = { id: '1', email: 'test@test.com', password: 'test123' };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await service.findId('1');
    expect(result).toEqual(mockUser);
  });
});
