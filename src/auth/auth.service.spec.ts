import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: { findEmail: jest.fn() } },
        { provide: JwtService, useValue: { signAsync: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user and return user object', async () => {
    const password = 'test123';
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: '1', email: 'test@test.com', password: hashed };

    jest.spyOn(usersService, 'findEmail').mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(true);

    const result = await service.validateUser(user.email, password);
    expect(result).toEqual(user);
  });

  it('should throw UnauthorizedException for invalid password', async () => {
    const password = 'wrong';
    const hashed = await bcrypt.hash('correct', 10);
    const user = { id: '1', email: 'test@test.com', password: hashed };

    jest.spyOn(usersService, 'findEmail').mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(false);

    await expect(service.validateUser(user.email, password)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should return access and refresh tokens on login', async () => {
    const user = {
      id: '1',
      email: 'test@test.com',
      password: 'hashed',
      createdAt: new Date(),
    };
    const dto = { email: user.email, password: 'test123' };

    jest.spyOn(service, 'validateUser').mockResolvedValue(user);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('access-token');
    jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('refresh-token');

    const result = await service.login(dto);
    expect(result).toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });
  });
});
